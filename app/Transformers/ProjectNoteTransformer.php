<?php

namespace CodeProject\Transformers;

use League\Fractal\TransformerAbstract;
use CodeProject\Entities\ProjectNote;


class ProjectNoteTransformer extends TransformerAbstract
{
    public function transform(ProjectNote $model) {
        return [
            'id'                => (int)$model->id,
            'project_id'        => (int) $model->project_id,
            'title'             => $model->title,
            'note'              => $model->note,
        ];
    }
}