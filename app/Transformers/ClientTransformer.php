<?php

namespace CodeProject\Transformers;

use League\Fractal\TransformerAbstract;
use CodeProject\Entities\Client;

class ClientTransformer extends TransformerAbstract
{

    protected $defaultIncludes = ['projects'];

    public function transform(Client $model) {
        return [
            'id'            => (int) $model->id,
            'name'          => $model->name ,
            'responsible'   => $model->responsible,
            'email'         => $model->email,
            'phone'         => $model->phone,
            'address'       => $model->address,
            'obs'           => $model->obs
        ];
    }

    public function includeProjects(Client $client)
    {
        $transformer = new ProjectTransformer();
        $transformer->setDefaultIncludes([]);
        return $this->collection($client->projects, $transformer);
    }

}