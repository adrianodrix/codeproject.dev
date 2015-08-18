<?php

namespace CodeProject\Services;

use CodeProject\Entities\Project;
use CodeProject\Entities\ProjectMember;
use \CodeProject\Repositories\ProjectMemberRepository;
use CodeProject\Validators\ProjectMemberValidator;
use \Prettus\Validator\Exceptions\ValidatorException;

class ProjectMemberService
{
    /**
     * @var \CodeProject\Repositories\ProjectTaskRepository
     */
    protected $repository;

    /**
     *
     * @var ProjectValidator
     */
    protected $validator;

    /**
     * @var ProjectMember
     */
    private $model;


    /**
     * @param ProjectMemberRepository $repository
     * @param ProjectMemberValidator $validator
     * @param Project $model
     */
    public function __construct(ProjectMemberRepository $repository, ProjectMemberValidator $validator, Project $model)
    {
        $this->repository = $repository;
        $this->validator = $validator;
        $this->model = $model;
    }

    /**
     * @param array $data
     * @param $projectId
     * @return array|mixed
     */
    public function create(array $data, $projectId)
    {
        try {
            $data['project_id'] = $projectId;
            $this->validator->with($data)->passesOrFail();

            return $this->repository->create($data);
        } catch (ValidatorException $e) {
            return [
                'error' => true,
                'message' => $e->getMessageBag(),
            ];
        } catch (\Exception $e) {
            return ["error" => true, "message" => $e->getMessage()];
        }
    }

    /**
     * @param $projectId
     * @param $memberId
     * @return array
     */
    public function destroy($projectId, $memberId)
    {
        try {
            if($this->model->findOrFail($projectId)->members()->detach($memberId)) {
                return ['success' => true, 'message' => 'Registro excluído'];
            }
            return ['error' => true, 'message' => 'Erro desconhecido ao tentar excluir o registro'];
        } catch (\Exception $e) {
            return ["error" => true, "message" => $e->getMessage()];
        }
    }

    /**
     * @param $projectId
     * @param $memberId
     * @return bool
     */
    public function isMember($projectId, $memberId)
    {
        return (boolean) $this->findWhere(['project_id' => $projectId, 'member_id' => $memberId])->count();
    }
}