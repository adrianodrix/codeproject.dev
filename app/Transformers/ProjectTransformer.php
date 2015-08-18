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
    protected $defaultIncludes = ['members'];

    /**
     * @param Project $model
     * @return array
     */
    public function transform(Project $model) {
        return [
            'project_id'    => (int) $model->id,
            'client'        => (int) $model->client_id,
            'name'          => $model->name,
            'description'   => $model->description,
            'progress'      => (int) $model->progress,
            'status'        => (int) $model->status,
            'due_date'      => $model->due_date
        ];
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