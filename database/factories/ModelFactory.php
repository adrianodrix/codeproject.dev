<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(CodeProject\Entities\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => strtolower($faker->email),
        'password' => bcrypt('123456'),
        'remember_token' => str_random(10),
    ];
});

$factory->define(CodeProject\Entities\Client::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'responsible' => $faker->name,
        'email' => strtolower($faker->email),
        'phone' => $faker->phoneNumber,
        'address' => $faker->address,
        'obs' => $faker->sentence,
    ];
});

$factory->define(CodeProject\Entities\Project::class, function (Faker\Generator $faker) {
    return [
        'owner_id' => \CodeProject\Entities\User::all()->lists('id')->random(1),
        'client_id' => \CodeProject\Entities\Client::all()->lists('id')->random(1),
        'name' => $faker->sentence,
        'description' => $faker->text(400),
        'progress' => $faker->numberBetween(0, 100),
        'status' => $faker->numberBetween(0, 2),
        'due_date' => $faker->dateTimeAD($min = 'now'),
    ];
});

$factory->define(CodeProject\Entities\ProjectNote::class, function (Faker\Generator $faker) {
    return [
        'project_id' => \CodeProject\Entities\Project::all()->lists('id')->random(1),
        'title' => $faker->sentence,
        'note' => $faker->text(400),
    ];
});

$factory->define(CodeProject\Entities\ProjectTask::class, function (Faker\Generator $faker) {
    return [
        'project_id' => \CodeProject\Entities\Project::all()->lists('id')->random(1),
        'name' => $faker->sentence,
        'start_date' => $faker->dateTimeAD($max = 'now'),
        'due_date' => $faker->dateTimeAD($min = 'now'),
        'status' => $faker->numberBetween(0, 2),
    ];
});