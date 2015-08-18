<?php

namespace CodeProject\Services;

use \CodeProject\Repositories\ProjectNoteRepository;
use \CodeProject\Validators\ProjecNotetValidator;
use CodeProject\Validators\ProjectNoteValidator;
use \Prettus\Validator\Exceptions\ValidatorException;

class ProjectNoteService
{
    /**
     * @var \CodeProject\Repositories\ProjectNoteRepository
     */
    protected $repository;

    /**
     *
     * @var ProjectValidator
     */
    protected $validator;


    public function __construct(ProjectNoteRepository $repository, ProjectNoteValidator $validator)
    {
        $this->repository = $repository;
        $this->validator = $validator;
    }


    public function create(array $data, $idProject)
    {
        try {
            $data['project_id'] = $idProject;

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

    public function update(array $data, $projectId, $noteId)
    {
        try {
            $data['project_id'] = $projectId;
            $this->validator->with($data)->passesOrFail();
            return $this->repository->update($data, $noteId);
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

    public function destroy($noteId)
    {
        try {
            if($this->repository->delete($noteId)) {
                return ['success', 'message' => 'Registro excluído'];
            }
            return ['error' => true, 'message' => 'Erro desconhecido ao tentar excluir o registro'];
        } catch (\Exception $e) {
            return ["error" => true,
                "message" => $e->getMessage()];
        }
    }
}
