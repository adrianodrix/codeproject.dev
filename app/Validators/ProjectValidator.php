<?php

namespace CodeProject\Validators;

use Prettus\Validator\LaravelValidator;

class ProjectValidator extends LaravelValidator
{
    protected $rules = [
        'owner_id'  => 'required|integer',
        'client_id' => 'required|integer',
        'name'      => 'required|max:255',
        'progress'  => 'required|integer|between:0,100',
        'status'    => 'required|integer|between:0,2',
        'due_date'  => 'required|date|after:now',
    ];
}