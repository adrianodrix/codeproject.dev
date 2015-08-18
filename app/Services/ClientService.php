<?php

namespace CodeProject\Services;

use \CodeProject\Repositories\ClientRepository;
use \CodeProject\Validators\ClientValidator;
use \Prettus\Validator\Exceptions\ValidatorException;

class ClientService
{
    /**
     * @var \CodeProject\Repositories\ClientRepository
     */
    protected $repository;

    /**
     *
     * @var ClientValidator
     */
    protected $validator;

    /**
     *
     * @param ClientRepository $repository
     */
    public function __construct(ClientRepository $repository, ClientValidator $validator)
    {
        $this->repository = $repository;
        $this->validator = $validator;
    }


    /**
     * @param array $data
     * @return array|mixed
     */
    public function create(array $data)
    {
        try {
            $this->validator->with($data)->passesOrFail();
            return $this->repository->create($data);
        } catch (ValidatorException $e) {
            return ['error' => true, 'message' => $e->getMessageBag()];
        } catch (\Exception $e) {
            return ["error" => true, "message" => $e->getMessage()];
        }
    }

    /**
     * @param array $data
     * @param $id
     * @return array|mixed
     */
    public function update(array $data, $id)
    {
        try {
            $this->validator->with($data)->setId($id)->passesOrFail();
            return $this->repository->update($data, $id);
        } catch (ValidatorException $e) {
            return ['error' => true, 'message' => $e->getMessageBag()];
        } catch (\Exception $e) {
            return ["error" => true, "message" => $e->getMessage()];
        }
    }


    /**
     * @param $id
     * @return array
     */
    public function destroy($id)
    {
        try {
            if ($this->repository->delete($id)){
                return ['success' => true];
            }
        } catch (\Exception $e) {
            return ["error" => true, "message" => $e->getMessage()];
        }
    }
}
