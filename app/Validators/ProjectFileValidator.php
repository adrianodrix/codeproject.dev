<?php

namespace CodeProject\Validators;

use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\LaravelValidator;

class ProjectFileValidator extends LaravelValidator
{
    protected $rules = [
        ValidatorInterface::RULE_CREATE => [
            'project_id'    => 'required|integer|exists:projects,id',
            'name'          => 'required|max:255',
            'description'   => 'required',
            'extension'     => 'required|max:4',
            'size'          => 'required|integer',
            'file'          => 'required|mimes:jpeg,jpg,png,gif,pdf,txt',
        ],
        ValidatorInterface::RULE_UPDATE => [
            'project_id'    => 'required|integer|exists:projects,id',
            'name'          => 'required|max:255',
            'description'   => 'required',
            'extension'     => 'required|max:4',
            'size'          => 'required|integer',
            'file'          => 'mimes:jpeg,jpg,png,gif,pdf,txt',
        ],
    ];
}