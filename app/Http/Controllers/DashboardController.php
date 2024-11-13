<?php

namespace App\Http\Controllers;

use App\Models\VehicleUsage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function dashboard()
    // $vehicleUsages = VehicleUsage::with('reservation.vehicle')->get();
    {
        $vehicleUsages = VehicleUsage::with('reservation.vehicle')
            ->orderBy('created_at', 'asc')
            ->get();

        // dd($chartData);
        return inertia('Dashboard', [
            'vehicleUsages' => $vehicleUsages
        ]);
    }
}
