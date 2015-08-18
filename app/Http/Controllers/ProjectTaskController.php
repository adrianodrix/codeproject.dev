<?php

namespace CodeProject\Http\Controllers;

use CodeProject\Repositories\ProjectTaskRepository;
use CodeProject\Services\ProjectTaskService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class ProjectTaskController extends Controller
{
    /**
     * @param ProjectTaskRepository $repository
     * @param ProjectTaskService $service
     */
    public function __construct(ProjectTaskRepository $repository, ProjectTaskService $service)
    {
        $this->repository = $repository;
        $this->service = $service;
    }

    /**
     * @param $projectId
     * @return mixed
     */
    public function index($projectId)
    {
        return $this->repository->findWhere(['project_id' => $projectId]);
    }

    /**
     * @param Request $request
     * @param $projectId
     * @return array|mixed
     */
    public function store(Request $request, $projectId)
    {
        return $this->service->create($request->all(), $projectId);
    }

    /**
     * @param $projectId
     * @param $taskId
     * @return array|mixed
     */
    public function show($projectId, $taskId)
    {
        if(!$this->checkProjectPermissions($projectId)) {
            return ['error' => 'Access forbidden'];
        }

        try {
            return $this->repository->findWhere(['project_id' => $projectId, 'id' => $taskId]);
        } catch( ModelNotFoundException $e ) {
            return [
                'error' => true,
                'message' => 'Não foi possível encontrar o registro'
            ];
        } catch (\Exception $e) {
            return ["error" => true, "message" => $e->getMessage()];
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request $request
     * @param  int $id
     * @param $taskId
     * @return Response
     */
    public function update(Request $request, $id, $taskId)
    {
        if(!$this->checkProjectPermissions($id)) {
            return ['error' => 'Access forbidden'];
        }

        try {
            return $this->service->update($request->all(), $id, $taskId);
        } catch (ModelNotFoundException $e) {
            return [
                'error' => true,
                'message' => 'Não foi possível encontrar o registro'
            ];
        } catch (\Exception $e) {
            return ["error" => true, "message" => $e->getMessage()];
        }
    }

    /**
     * @param $projectId
     * @param $taskId
     * @return array
     */
    public function destroy($projectId, $taskId)
    {
        if(!$this->checkProjectOwner($projectId)) {
            return ['error' => 'Access forbidden'];
        }
        return $this->service->destroy($taskId);
    }
}
