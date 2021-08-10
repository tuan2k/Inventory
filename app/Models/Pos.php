<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pos extends Model
{
    protected $fillable = [
        'pro_id', 'pro_name', 'pro_price',
        'pro_quantity', 'sub_total'
    ];
}
