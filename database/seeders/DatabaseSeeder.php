<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Faisal Bahari',
            'email' => 'faisal@mail.com',
            'password' => bcrypt('password'),
            'email_verified_at' => time()
        ]);

        Project::factory()->count(100)->hasTasks(10)->create();
    }
}
