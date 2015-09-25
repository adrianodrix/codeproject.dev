<?php

namespace CodeProject\Validators;

use Prettus\Validator\LaravelValidator;

class ProjectTaskValidator extends LaravelValidator
{
    protected $rules = [
        'name'       => 'required|max:255',
        'status'     => 'required|integer|between:0,1',
        'start_date' => 'date',
        'due_date'   => 'date|after:start_date',
    ];
}