<?php
namespace CodeProject\Http\Controllers;

use Illuminate\Http\Request;
use \CodeProject\Repositories\ProjectNoteRepository;
use \CodeProject\Services\ProjectNoteService;

class ProjectNoteController extends Controller
{
    /**
     * @var \CodeProject\Repositories\ProjectNoteRepository
     */
    protected $repository;

    /**
     *
     * @var ProjectNoteService
     */
    protected $service;

    /**
     * @param ProjectNoteRepository $repository
     * @param ProjectNoteService $service
     */
    public function __construct(ProjectNoteRepository $repository, ProjectNoteService $service)
    {
        $this->repository = $repository;
        $this->service    = $service;
    }

    /**
     * @param $projectId
     * @return array|mixed
     */
    public function index($projectId)
    {
        return  $this->repository->findWhere(['project_id' => $projectId]);
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
     * @param $noteId
     * @return array|mixed
     */
    public function show($projectId, $noteId)
    {
       try {
            $result = $this->repository->find($noteId);
            return $result;
        } catch( ModelNotFoundException $e ) {
            return [
                'error' => true,
                'message' => 'Não foi possível encontrar o registro'
            ];
        } catch (\Exception $e) {
            return ["error" => true,
                "message" => $e->getMessage()];
        }
    }

    /**
     * @param Request $request
     * @param $projectId
     * @param $noteId
     * @return Response
     */
    public function update(Request $request, $projectId, $noteId)
    {
        return $this->service->update($request->all(), $projectId, $noteId);
    }

    /**
     * @param $projectId
     * @param $noteId
     * @return array
     */
    public function destroy($projectId, $noteId)
    {
        return $this->service->destroy($noteId);
    }
}
