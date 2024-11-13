<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function approvals()
    {
        return $this->hasMany(Approval::class);
    }

    public function vehicleUsages()
    {
        return $this->hasMany(VehicleUsage::class);
    }
}
