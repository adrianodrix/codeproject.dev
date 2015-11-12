<?php

namespace CodeProject\Events;

use CodeProject\Entities\ProjectTask;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class TaskWasChanged extends Event implements ShouldBroadcast
{
    use SerializesModels;

    /**
     * @var ProjectTask
     */
    public $task;

    public function __construct(ProjectTask $task)
    {
        $this->task = $task;
    }

    public function broadcastOn()
    {
        return [
            'user.'. \Authorizer::getResourceOwnerId(),
        ];
    }
}
