<?php

namespace CodeProject\Services;

use \CodeProject\Repositories\ProjectTaskRepository;
use CodeProject\Repositories\ProjectRepository;
use CodeProject\Validators\ProjectTaskValidator;
use \Prettus\Validator\Exceptions\ValidatorException;

class ProjectTaskService
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
     * @param ProjectTaskRepository $repository
     * @param ProjectTaskValidator $validator
     */
    public function __construct(ProjectTaskRepository $repository, ProjectTaskValidator $validator)
    {
        $this->repository = $repository;
        $this->validator = $validator;
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
            return ["error" => true,
                "message" => $e->getMessage()];
        }
    }

    /**
     * @param array $data
     * @param $projectId
     * @param $taskId
     * @return array|mixed
     */
    public function update(array $data, $projectId, $taskId)
    {
        try {
            $data['project_id'] = $projectId;
            $this->validator->with($data)->passesOrFail();
            return $this->repository->update($data, $taskId);
        } catch (ValidatorException $e) {
            return [
                'error' => true,
                'message' => $e->getMessageBag(),
            ];
        } catch (\Exception $e) {
            return ["error" => true,
                "message" => $e->getMessage()];
        }
    }

    /**
     * @param $taskId
     * @return array
     */
    public function destroy($taskId)
    {
        try {
            if($this->repository->delete($taskId)) {
                return ['success' => true, 'message' => 'Registro excluído'];
            }
            return ['error' => true, 'message' => 'Erro desconhecido ao tentar excluir o registro'];
        } catch (\Exception $e) {
            return ["error" => true,
                "message" => $e->getMessage()];
        }
    }
}
