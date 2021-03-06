<?php

namespace CodeProject\Http\Controllers;

use CodeProject\Repositories\ProjectRepository;
use CodeProject\Services\ProjectService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * @param ProjectRepository $repository
     * @param ProjectService $service
     */
    public function __construct(ProjectRepository $repository, ProjectService $service)
    {
        $this->repository   = $repository;
        $this->service      = $service;

        $this->middleware('check-project-owner', ['except' => ['index', 'store', 'show']]);
        $this->middleware('check-project-permission', ['except' => ['index', 'store', 'update', 'destroy']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(Request $request)
    {
        return $this->repository->findWithOwnerAndMember(\Authorizer::getResourceOwnerId(), $request->query->get('limit'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        return $this->service->create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        try {
            return $this->repository->find($id);
        } catch( \Exception $e ) {
            return [
                'error' => true,
                'message' => 'Não foi possível encontrar o registro'
            ];
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        return $this->service->update($request->all(), $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        return $this->service->destroy($id);
    }

}
