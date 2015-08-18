<?php

namespace CodeProject\Services;

use \CodeProject\Repositories\ProjectFileRepository;
use \CodeProject\Validators\ProjecNotetValidator;
use CodeProject\Validators\ProjectFileValidator;
use \Prettus\Validator\Exceptions\ValidatorException;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Contracts\Filesystem\Factory as Storage;

class ProjectFileService
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
    /**
     * @var Filesystem
     */
    private $fileSystem;
    /**
     * @var Storage
     */
    private $storage;

    /**
     * @var array
     */
    private $extensions = array('jpg', 'jpeg', 'bmp', 'png', 'gif');
    /**
     * @var int
     */
    private $sizeMax = 1024 * 1024 * 2; // 2Mb

    /**
     * @param ProjectFileRepository $repository
     * @param ProjectFileValidator $validator
     * @param Filesystem $fileSystem
     * @param Storage $storage
     */
    public function __construct(ProjectFileRepository $repository, ProjectFileValidator $validator,  Filesystem $fileSystem, Storage $storage)
    {
        $this->repository = $repository;
        $this->validator = $validator;
        $this->fileSystem = $fileSystem;
        $this->storage = $storage;
    }


    /**
     * @param array $data
     * @param $file
     * @param $idProject
     * @return array|mixed
     */
    public function create(array $data, $file, $idProject)
    {
        try {
            $data['project_id'] = $idProject;
            $data['extension']  = $file->getClientOriginalExtension();
            $data['size']       = $file->getClientSize();

            $this->validator->with($data)->passesOrFail();

            if ($data['size'] > $this->sizeMax){
                return [
                    'error' => true,
                    'message' => 'O arquivo enviado é muito grande, envie arquivos de até 2MB.',
                ];
            }

            if (array_search($data['extension'], $this->extensions) === false) {
                return [
                    'error' => true,
                    'message' => 'O arquivo não é do tipo válido.',
                ];
            }

            $projectFile = $this->repository->skipPresenter()->create($data);

            $this->storage->put(
                $projectFile->id .'.'. $projectFile->extension,
                $this->fileSystem->get($file)
            );

            return $projectFile;
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
     * @param $fileId
     * @return array|mixed
     */
    public function update(array $data, $projectId, $fileId)
    {
        try {
            $data['project_id'] = $projectId;
            $this->validator->with($data)->passesOrFail();
            return $this->repository->update($data, $fileId);
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
     * @param $fileId
     * @return array
     */
    public function destroy($fileId)
    {
        try {
            $file     = $this->repository->skipPresenter()->find($fileId);
            $fileName = $file->id .'.'. $file->extension;

            if ($this->storage->exists($fileName)){
                $this->storage->delete($fileName);
            }

            if ($file->delete()){
                return ["success" => true];
            }

            return ['error' => true, 'message' => 'Erro desconhecido ao tentar excluir o registro'];
        } catch (\Exception $e) {
            return ["error" => true,
                "message" => $e->getMessage()];
        }
    }
}