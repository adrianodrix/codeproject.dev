<?php

namespace CodeProject\Http\Controllers;

use CodeProject\Repositories\ProjectFileRepository;
use CodeProject\Services\ProjectFileService;
use Illuminate\Http\Request;
use CodeProject\Http\Requests;

class ProjectFileController extends Controller
{

    /**
     * @param ProjectFileRepository $repository
     * @param ProjectFileService $service
     */
    public function __construct(ProjectFileRepository $repository, ProjectFileService $service)
    {
        $this->repository = $repository;
        $this->service    = $service;
    }

    /**
     * Display a listing of the resource.
     *
     * @param $projectId
     * @return array|mixed
     */
    public function index($projectId)
    {
        if(!$this->checkProjectPermissions($projectId)) {
            return ['error' => 'Access forbidden'];
        }
        return  $this->repository->findWhere(['project_id' => $projectId]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request, $projectId)
    {
        if(!$this->checkProjectPermissions($projectId)) {
            return ['error' => 'Access forbidden'];
        }

        $file = $request->file('file');
        if(!$file) {
            return ['error' => true, 'message' => 'You must send a file'];
        }

        return $this->service->create($request->all(), $file, $projectId);
    }

    /**
     * @param $projectId
     * @param $fileId
     * @return array|mixed
     */
    public function show($projectId, $fileId)
    {
        if(!$this->checkProjectPermissions($projectId)) {
            return ['error' => 'Access forbidden'];
        }

        try {
            return $this->repository->findWhere(['project_id' => $projectId, 'id' => $fileId]);
        } catch( ModelNotFoundException $e ) {
            return [
                'error' => true,
                'message' => 'Não foi possível encontrar o registro'
            ];
        } catch (\Exception $e) {
            return ["error" => true,
                "message" => $e->getMessage()
            ];
        }
    }

    /**
     * @param Request $request
     * @param $projectId
     * @param $fileId
     * @return array|mixed
     */
    public function update(Request $request, $projectId, $fileId)
    {
        if(!$this->checkProjectPermissions($projectId)) {
            return ['error' => 'Access forbidden'];
        }

        return $this->service->update($request->all(), $projectId, $fileId);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $projectId
     * @param $fileId
     * @return array
     */
    public function destroy($projectId, $fileId)
    {
        if(!$this->checkProjectPermissions($projectId)) {
            return ['error' => 'Access forbidden'];
        }

        return $this->service->destroy($fileId);
    }
}
