<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class MenuPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = [
            'product_create',
            'product_show',
            'product_edit',
            'product_delete'
        ];

        $user = Role::findByName('admin');

        foreach ($permissions as $permission)   {
            $user->givePermissionTo($permission);
        }
    }
}
