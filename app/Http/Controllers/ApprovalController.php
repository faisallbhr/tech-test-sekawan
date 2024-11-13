<?php

namespace App\Http\Controllers;

use App\Http\Resources\ApprovalResource;
use Auth;
use DB;
use App\Models\Approval;
use App\Models\Reservation;
use Illuminate\Http\Request;
use App\Http\Requests\ApprovalUpdateRequest;

class ApprovalController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        // Mengambil approvals milik user yang sedang login dengan level approval terkait
        $approvals = Approval::with('reservation')
            ->where('approver_id', $userId)
            ->whereNotExists(function ($query) {
                $query->select(DB::raw(1))
                    ->from('approvals as previous_approvals')
                    ->whereColumn('previous_approvals.reservation_id', 'approvals.reservation_id')
                    ->whereColumn('previous_approvals.approval_level', '<', 'approvals.approval_level')
                    ->where('previous_approvals.status', '!=', 'approved');
            })
            ->paginate(10)
            ->onEachSide(1);

        return inertia('Approval/Index', [
            'approvals' => ApprovalResource::collection($approvals)
        ]);
    }

    public function update(ApprovalUpdateRequest $request, $approvalId)
    {
        $data = $request->validated();
        try {
            DB::beginTransaction();
            $approval = Approval::findOrFail($approvalId);
            $approval->status = $data['status'];
            $approval->approval_date = now();
            $approval->save();

            $this->updateReservationStatus($approval->reservation_id);
            DB::commit();

            return to_route('approvals.index');
        } catch (\Throwable $th) {
            DB::rollBack();
            dd($th->getMessage());
        }
    }

    private function updateReservationStatus($reservationId)
    {
        $reservation = Reservation::findOrFail($reservationId);
        $approvals = Approval::where('reservation_id', $reservationId)->get();

        if ($approvals->contains('status', 'rejected')) {
            $reservation->status = 'rejected';
        } else {
            $approvedCount = $approvals->filter(function ($approval) {
                return $approval->status === 'approved';
            })->count();

            $reservation->status = $approvedCount >= 2 ? 'approved' : 'pending';
        }

        $reservation->save();
    }
}
