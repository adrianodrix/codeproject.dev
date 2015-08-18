<?php

namespace CodeProject\Validators;

use Prettus\Validator\LaravelValidator;

class ProjectFileValidator extends LaravelValidator
{
    protected $rules = [
        'project_id'    => 'required|integer|exists:projects,id',
        'name'          => 'required|max:255',
        'description'   => 'required',
        'extension'     => 'required|max:4',
        'size'          => 'required|integer',
    ];
}