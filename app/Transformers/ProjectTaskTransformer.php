<?php

namespace CodeProject\Transformers;

use League\Fractal\TransformerAbstract;
use CodeProject\Entities\ProjectTask;

/**
 * Class ProjectTaskTransformer
 * @package namespace CodeProject\Transformers;
 */
class ProjectTaskTransformer extends TransformerAbstract
{

    /**
     * Transform the \ProjectTask entity
     * @param \ProjectTask $model
     *
     * @return array
     */
    public function transform(ProjectTask $model) {
        return [
            'id'   => (int)$model->id,
            'project_id'           => (int)$model->project_id,
            'name'              => $model->name,
            'start_date'        => $model->start_date,
            'due_date'          => $model->due_date,
            'status'            => (int) $model->status,
            'created_at'        => $model->created_at->format('Y-m-d H:i:s'),
        ];
    }
}