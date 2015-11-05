<?php
namespace CodeProject\Http\Controllers;

use Illuminate\Http\Request;
use \CodeProject\Repositories\ClientRepository;
use \CodeProject\Services\ClientService;
use Illuminate\Http\Response;

class ClientController extends Controller
{

    /**
     * @var \CodeProject\Repositories\ClientRepository
     */
    protected $repository;

    /**
     *
     * @var ClientService
     */
    protected $service;

    /**
     *
     * @param ClientRepository $repository
     */
    public function __construct(ClientRepository $repository, ClientService $service)
    {
        $this->repository = $repository;
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(Request $request)
    {
        if($request->query->get('paginate') === 'false'){
            return $this->repository->all();
        }
        return $this->repository->paginate($request->query->get('limit'));
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
        return $this->repository->find($id);
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
        try {
            $this->service->destroy($id);
            return response('', 204);
        } catch (\Exception $e) {
            return Response::json([
                "error" => true,
                "message" => $e->getMessage()
            ], 400);
        }
    }
}
