<?php

namespace CodeProject\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Client extends Model implements Transformable
{
    use TransformableTrait,
        SoftDeletes;

    protected $fillable = [
        'name',
        'responsible',
        'email',
        'phone',
        'address',
        'obs',
    ];

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
