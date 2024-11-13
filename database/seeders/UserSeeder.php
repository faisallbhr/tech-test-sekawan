<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roleAdmin = Role::create(['name' => 'admin']);
        $roleApprover = Role::create(['name' => 'approver']);

        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@mail.com',
            'password' => bcrypt('password')
        ]);

        $approver1 = User::create([
            'name' => 'Approver 1',
            'email' => 'approver1@mail.com',
            'password' => bcrypt('password')
        ]);

        $approver2 = User::create([
            'name' => 'Approver 2',
            'email' => 'approver2@mail.com',
            'password' => bcrypt('password')
        ]);

        $approver3 = User::create([
            'name' => 'Approver 3',
            'email' => 'approver3@mail.com',
            'password' => bcrypt('password')
        ]);

        $approver4 = User::create([
            'name' => 'Approver 4',
            'email' => 'approver4@mail.com',
            'password' => bcrypt('password')
        ]);

        $admin->assignRole($roleAdmin);
        $approver1->assignRole($roleApprover);
        $approver2->assignRole($roleApprover);
        $approver3->assignRole($roleApprover);
        $approver4->assignRole($roleApprover);
    }
}
