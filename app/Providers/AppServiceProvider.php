<?php

namespace CodeProject\Providers;

use CodeProject\Entities\ProjectTask;
use CodeProject\Events\TaskWasChanged;
use CodeProject\Events\TaskWasIncluded;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        ProjectTask::created(function($task){
            event(new TaskWasIncluded($task));
        });

        ProjectTask::updated(function($task){
            event(new TaskWasChanged($task));
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
