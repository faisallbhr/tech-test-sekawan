<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Vehicle;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
        ]);
        Vehicle::factory()->count(10)->create();
    }
}
