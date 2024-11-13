<?php

namespace App\Http\Controllers;

use App\Http\Requests\VehicleUsageStoreRequest;
use App\Models\VehicleUsage;
use Illuminate\Http\Request;

class VehicleUsageController extends Controller
{
    public function store(VehicleUsageStoreRequest $request)
    {
        $data = $request->validated();
        VehicleUsage::create([
            'reservation_id' => $data['reservation_id'],
            'distance' => $data['distance'],
            'fuel_usage' => $data['fuel_usage'],
        ]);
    }
}
