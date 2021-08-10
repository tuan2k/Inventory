<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Permission extends Model
{
    use Notifiable;

    protected $table = "permissions";

    protected $fillable = [
        'id', 'name', 'guard_name', 'created_at', 'updated_at'
    ];

    protected $dataTableColumns = [
        'id' => [
            'searchable' => false,
        ],
        'name' => [
            'searchable' => true,
        ],
        'guard_name' => [
            'searchable' => true,
        ],
        'created_at' => [
            'searchable' => true,
        ]
    ];
}
