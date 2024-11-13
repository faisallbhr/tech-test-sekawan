<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApprovalResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'reservation' => new ReservationResource($this->reservation),
            'approver' => new UserResource($this->approver),
            'approval_level' => $this->approval_level,
            'status' => $this->status,
            'approval_date' => $this->approval_date,
        ];
    }
}
