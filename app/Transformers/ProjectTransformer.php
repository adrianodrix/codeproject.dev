<?php

namespace CodeProject\Transformers;

use League\Fractal\TransformerAbstract;
use CodeProject\Entities\Project;


class ProjectTransformer extends TransformerAbstract
{

    protected $defaultIncludes = ['client', 'members'];
    protected $availableIncludes = ['notes', 'tasks', 'files'];

    public function transform(Project $model) {

        return [
            'id'    => (int) $model->id,
            'client_id'        => (int) $model->client_id,
            'owner_id'        => (int) $model->owner_id,
            'name'          => $model->name,
            'description'   => $model->description,
            'progress'      => (int) $model->progress,
            'due_date'      => $model->due_date,
            'is_member'     => $model->owner_id != \Authorizer::getResourceOwnerId(),
            'status'        => (int)$model->status,
            'status_str'    => $this->resolveStatus($model->status),
            'tasks_count'   => $model->tasks->count(),
            'tasks_opened'  => $this->countTasksOpened($model),
            'created_at'    => $model->created_at->format('Y-m-d H:i:s'),
        ];
    }

    private function resolveStatus($status)
    {
        switch ($status) {
            case 0:
                return 'Pendente';
                break;
            case 1:
                return 'Em Andamento';
                break;
            case 2:
                return 'Concluido';
                break;
            default:
                return '';
        }
    }

    public function includeClient(Project $project)
    {
        return $this->item($project->client, $this->setTransformer(new ClientTransformer()));
    }

    public function includeMembers(Project $project)
    {
        return $this->collection($project->members,  $this->setTransformer(new ProjectMemberTransformer()));
    }

    public function includeNotes(Project $project)
    {
        return $this->collection($project->notes, $this->setTransformer( new ProjectNoteTransformer()));
    }

    public function includeTasks(Project $project)
    {
        return $this->collection($project->tasks, $this->setTransformer(new ProjectTaskTransformer()));
    }

    public function includeFiles(Project $project)
    {
        return $this->collection($project->files, $this->setTransformer(new ProjectFileTransformer()));
    }

    private function setTransformer($transformer)
    {
        $transformer->setDefaultIncludes([]);
        return $transformer;
    }

    private function countTasksOpened($project)
    {
        $count = 0;
        foreach ($project->tasks as $task) {
            if($task->status != 1){
                $count++;
            }
        }
        return $count;
    }
}