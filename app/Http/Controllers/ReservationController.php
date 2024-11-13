<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\VehicleResource;
use App\Models\User;
use App\Models\Vehicle;
use DB;
use App\Models\Approval;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ReservationStoreRequest;

class ReservationController extends Controller
{
    public function index()
    {
        $reservation = Reservation::with('admin', 'vehicle')
            ->paginate(10)->onEachSide(1);

        return inertia('Reservation/Index', [
            'reservations' => ReservationResource::collection($reservation)
        ]);
    }

    public function create()
    {
        $vehicles = Vehicle::all();
        $users = User::role('approver')->get();

        return inertia('Reservation/Create', [
            'vehicles' => VehicleResource::collection($vehicles),
            'users' => UserResource::collection($users),
            'maxApprovers' => $users->count()
        ]);
    }

    public function show(Reservation $reservation)
    {
        return inertia('Reservation/Show', [
            'reservation' => new ReservationResource($reservation)
        ]);
    }

    public function update(Request $request, Reservation $reservation)
    {
        $request->validate([
            'is_returned' => 'required|boolean'
        ]);

        $reservation->is_returned = $request->is_returned;
        $reservation->save();
    }

    public function store(ReservationStoreRequest $request)
    {
        $data = $request->validated();
        DB::beginTransaction();
        try {
            $reservation = Reservation::create([
                'admin_id' => Auth::id(),
                'requester' => $data['requester'],
                'vehicle_id' => $data['vehicle_id'],
                'driver' => $data['driver'],
                'start_date' => $data['start_date'],
                'end_date' => $data['end_date'],
            ]);

            foreach ($data['approvers'] as $key => $approver) {
                Approval::create([
                    'reservation_id' => $reservation->id,
                    'approver_id' => $approver['id'],
                    'approval_level' => $key + 1,
                ]);
            }

            DB::commit();

            return to_route('reservations.index');
        } catch (\Throwable $th) {
            DB::rollBack();
            dd($th->getMessage());
        }
    }

    public function destroy(Reservation $reservation)
    {
        $reservation->delete();
        return to_route('reservations.index');
    }
}
