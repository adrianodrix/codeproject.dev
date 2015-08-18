<?php

namespace CodeProject\Transformers;

use CodeProject\Entities\User;
use League\Fractal\TransformerAbstract;

/**
 * Class ProjectMemberTransformer
 * @package namespace CodeProject\Transformers;
 */
class ProjectMemberTransformer extends TransformerAbstract
{
    /**
     * @param User $member
     * @return array
     */
    public function transform(User $member)
    {
        return [
            'member_id' => (int) $member->id,
            'name'      => $member->name,
            'email'     => $member->email,
        ];
    }
}