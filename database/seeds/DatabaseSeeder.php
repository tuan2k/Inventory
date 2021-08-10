<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
//         $this->call(\Database\Seeders\AdminUserSeeder::class);
//         $this->call(\Database\Seeders\AdminPermissionSeeder::class);
//        $this->call(\Database\Seeders\PermissionSeeder::class);
        $this->call(\Database\Seeders\MenuPermissionSeeder::class);
    }
}
