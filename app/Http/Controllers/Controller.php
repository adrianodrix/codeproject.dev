<?php

namespace CodeProject\Http\Controllers;

use CodeProject\Repositories\ProjectRepository;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;


abstract class Controller extends BaseController
{
    use DispatchesJobs, ValidatesRequests;

    /**
     * @var Repository
     */
    protected $repository;

    /**
     * @var Service
     */
    protected $service;


    /**
     * @return ProjectRepository
     */
    private function getProjectRepository()
    {
        return app(ProjectRepository::class);
    }

    /**
     * @param $project_id
     * @return array
     */
    protected function checkProjectOwner($project_id)
    {
        $user_id = \Authorizer::getResourceOwnerId();
        return $this->getProjectRepository()->isOwner($project_id, $user_id);
    }

    /**
     * @param $project_id
     * @return array
     */
    protected function checkProjectMember($project_id)
    {
        $user_id = \Authorizer::getResourceOwnerId();
        return $this->getProjectRepository()->isMember($project_id, $user_id);
    }

    /**
     * Check permissions member ou owner this project id
     *
     * @param $project_id
     * @return bool
     */
    protected function checkProjectPermissions($project_id)
    {
        if($this->checkProjectOwner($project_id) || $this->checkProjectMember($project_id)) {
            return true;
        }
        return false;
    }

    /**
     * @return mixed
     */
    public function getAuthorizerId()
    {
        return \Authorizer::getResourceOwnerId();
    }
}
