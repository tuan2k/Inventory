<?php
/**
 * Created by PhpStorm.
 * User: lorence
 * Date: 31/12/2019
 * Time: 11:06
 */

namespace App\Repositories\Permission;


interface PermissionRepository
{
    public function getAll();

    public function create(array $attributes = []);

    public function delete($id);

    public function findByField($field, $value = null, $columns = ['*']);

    public function update(array $attributes, $id);

    public function findWhere(array $where, $columns = ['*']);
}
