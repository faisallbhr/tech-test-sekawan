<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleResource extends JsonResource
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
            'name' => $this->name,
            'type' => $this->type,
            'code' => $this->code,
            'last_serviced' => $this->last_serviced,
            'fuel_consumption' => $this->fuel_consumption,
            'total_fuel_used' => $this->total_fuel_used,
            'total_distance' => $this->total_distance,
        ];
    }
}
