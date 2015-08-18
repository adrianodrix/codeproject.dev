<?php

use Illuminate\Database\Seeder;

class ProjectMemberTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('project_members')->delete();

        for ($i = 1; ; $i++) {
            if ($i > 50) {
                break;
            }
            for (; ; ) {
                $projectId = \CodeProject\Entities\Project::all()->lists('id')->random(1);
                $userId = \CodeProject\Entities\User::all()->lists('id')->random(1);

                if (\CodeProject\Entities\ProjectMember::where('project_id', $projectId)
                        ->where('member_id', $userId)->count() == 0){
                    \CodeProject\Entities\ProjectMember::create([
                        'project_id' => $projectId,
                        'member_id' => $userId,
                    ]);
                    break;
                }
            }
        }
    }
}
