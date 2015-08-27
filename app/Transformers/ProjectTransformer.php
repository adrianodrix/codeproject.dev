<?php

namespace CodeProject\Transformers;

use League\Fractal\TransformerAbstract;
use CodeProject\Entities\Project;

/**
 * Class ProjectTransformer
 * @package namespace CodeProject\Transformers;
 */
class ProjectTransformer extends TransformerAbstract
{
    /**
     * @var array
     */
    protected $defaultIncludes = ['client', 'members'];

    /**
     * @param Project $model
     * @return array
     */
    public function transform(Project $model) {

        return [
            'id'    => (int) $model->id,
            'client_id'        => (int) $model->client_id,
            'owner_id'        => (int) $model->owner_id,
            'name'          => $model->name,
            'description'   => $model->description,
            'progress'      => (int) $model->progress,
            'status'        => (int)$model->status,
            'due_date'      => $model->due_date
        ];
    }

    /**
     * @param Project $project
     * @return mixed
     */
    public function includeClient(Project $project)
    {
        return $this->item($project->client, new ClientTransformer());
    }

    /**
     * @param Project $project
     * @return mixed
     */
    public function includeMembers(Project $project)
    {
        return $this->collection($project->members, new ProjectMemberTransformer());
    }


}