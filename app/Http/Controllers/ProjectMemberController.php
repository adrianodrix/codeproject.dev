<?php

namespace CodeProject\Http\Controllers;

use CodeProject\Repositories\ProjectMemberRepository;
use CodeProject\Services\ProjectMemberService;
use Illuminate\Http\Request;
use CodeProject\Http\Requests;

class ProjectMemberController extends Controller
{
    /**
     * @param ProjectMemberRepository $repository
     * @param ProjectMemberService $service
     */
    public function __construct(ProjectMemberRepository $repository, ProjectMemberService $service)
    {
        $this->repository = $repository;
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.

     * @param $projectId
     * @return mixed
     */
    public function index($projectId)
    {
        return $this->repository->with('member')->findWhere(['project_id' => $projectId]);
    }

    /**
     * Store a newly created resource in storage.
     *
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
     * @param $memberId
     * @return array|mixed
     */
    public function show($projectId, $memberId)
    {
        return $this->repository
            ->with('member')
            ->findWhere([
                'project_id' => $projectId,
                'member_id' => $memberId
            ]);
    }

    /**
     * @param $projectId
     * @param $memberId
     * @return array
     */
    public function destroy($projectId, $memberId)
    {
        return $this->service->destroy($projectId, $memberId);
    }

    /**
     * @param $projectId
     * @param $memberId
     * @return array
     */
    public function isMember($projectId, $memberId)
    {
        $isMember = $this->repository->isMember($projectId, $memberId);
        return ['is_member' => $isMember];
    }
}
