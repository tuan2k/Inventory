<?php
/**
 * Created by PhpStorm.
 * User: lorence
 * Date: 31/12/2019
 * Time: 11:09
 */

namespace App\Repositories\Role;

use Prettus\Repository\Eloquent\BaseRepository;

class EloquentRole extends BaseRepository implements RoleRepository {

    /* MODEL
     * @return string
     */
    public function model()
    {
        return "App\\Model\\Role";
    }

    public function with($relations)
    {
        return parent::with($relations);
    }

    public function getAll()
    {
        return $this->model->get(['id', 'name']);
    }

    public function create(array $attributes = [])
    {
        return parent::create($attributes);
    }

    public function delete($id) {
        return parent::delete($id);
    }

    public function findByField($field, $value = null, $columns = ['*']) {
        return parent::findByField($field, $value, $columns);
    }

    public function update(array $attributes, $id) {
        return parent::update($attributes, $id);
    }

    public function findWhere(array $where, $columns = ['*']) {
        return parent::findWhere($where, $columns);
    }
}
