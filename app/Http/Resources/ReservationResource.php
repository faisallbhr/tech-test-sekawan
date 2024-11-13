<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
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
            'admin' => new UserResource($this->admin),
            'requester' => $this->requester,
            'vehicle' => new VehicleResource($this->vehicle),
            'driver' => $this->driver,
            'start_date' => Carbon::parse($this->start_date)->format('d/m/Y'),
            'end_date' => Carbon::parse($this->end_date)->format('d/m/Y'),
            'status' => $this->status,
            'is_returned' => $this->is_returned,
        ];
    }
}
