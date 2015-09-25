<!DOCTYPE html>
<html lang="pt-br" ng-app="codeProject">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel</title>

    @if(Config::get('app.debug'))
        <link rel="stylesheet" href="{{ asset('build/css/app.css') }}">
        <link rel="stylesheet" href="{{ asset('build/css/components.css') }}">
        <link rel="stylesheet" href="{{ asset('build/css/flaticon.css') }}">
        <link rel="stylesheet" href="{{ asset('build/css/font-awesome.css') }}">
    @else
        <link rel="stylesheet" href="{{ elixir('css/all.css') }}">
    @endif

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle Navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Laravel</a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li><a href="{{ url('/') }}">Home</a></li>
                <li><a href="#/projects">Projects</a></li>
                <li><a href="#/clients">Clients</a></li>
            </ul>

            <ul class="nav navbar-nav navbar-right">

                <li><a href="#/login">Login</a></li>
                <li><a href="{{ url('/auth/register') }}">Register</a></li>

            </ul>
        </div>
    </div>
</nav>

<div ng-view></div>

<!-- Scripts -->
@if(Config::get('app.debug'))
    <!-- VENDORS -->
    <script src="{{ asset('build/js/vendor/jquery.min.js') }}"></script>
    <script src="{{ asset('build/js/vendor/bootstrap.min.js') }}"></script>
    <script src="{{ asset('build/js/vendor/angular.min.js') }}"></script>
    <script src="{{ asset('build/js/vendor/angular-route.min.js') }}"></script>
    <script src="{{ asset('build/js/vendor/angular-resource.min.js') }}"></script>
    <script src="{{ asset('build/js/vendor/angular-animate.min.js') }}"></script>
    <script src="{{ asset('build/js/vendor/angular-messages.min.js') }}"></script>
    <script src="{{ asset('build/js/vendor/ui-bootstrap-tpls.min.js') }}"></script>
    <script src="{{ asset('build/js/vendor/navbar.min.js') }}"></script>
    <script src="{{ asset('build/js/vendor/angular-cookies.min.js') }}"></script>
    <script src="{{ asset('build/js/vendor/query-string.js') }}"></script>
    <script src="{{ asset('build/js/vendor/angular-oauth2.min.js') }}"></script>
    <script src="{{ asset('build/js/vendor/ng-file-upload.min.js') }}"></script>

    <!-- APP AND CONFIGS -->
    <script src="{{ asset('build/js/app.js') }}"></script>

    <!-- FILTERS -->
    <script src="{{ asset('build/js/filters/date-br.js') }}"></script>

    <!-- DIRECTIVES -->
    <script src="{{ asset('build/js/directives/projectFileDownload.js') }}"></script>

    <!-- CONTROLLERS -->
    <script src="{{ asset('build/js/controllers/loginController.js') }}"></script>
    <script src="{{ asset('build/js/controllers/homeController.js') }}"></script>

    <script src="{{ asset('build/js/controllers/client/index.js') }}"></script>
    <script src="{{ asset('build/js/controllers/client/new.js') }}"></script>
    <script src="{{ asset('build/js/controllers/client/edit.js') }}"></script>
    <script src="{{ asset('build/js/controllers/client/remove.js') }}"></script>

    <script src="{{ asset('build/js/controllers/project/index.js') }}"></script>
    <script src="{{ asset('build/js/controllers/project/new.js') }}"></script>
    <script src="{{ asset('build/js/controllers/project/show.js') }}"></script>
    <script src="{{ asset('build/js/controllers/project/edit.js') }}"></script>
    <script src="{{ asset('build/js/controllers/project/remove.js') }}"></script>

    <script src="{{ asset('build/js/controllers/project/note/index.js') }}"></script>
    <script src="{{ asset('build/js/controllers/project/note/show.js') }}"></script>
    <script src="{{ asset('build/js/controllers/project/note/new.js') }}"></script>
    <script src="{{ asset('build/js/controllers/project/note/edit.js') }}"></script>
    <script src="{{ asset('build/js/controllers/project/note/remove.js') }}"></script>

    <script src="{{ asset('build/js/controllers/project/task/index.js') }}"></script>
    <script src="{{ asset('build/js/controllers/project/task/show.js') }}"></script>
    <script src="{{ asset('build/js/controllers/project/task/new.js') }}"></script>
    <script src="{{ asset('build/js/controllers/project/task/edit.js') }}"></script>
    <script src="{{ asset('build/js/controllers/project/task/remove.js') }}"></script>

    <script src="{{ asset('build/js/controllers/project/file/index.js') }}"></script>
    <script src="{{ asset('build/js/controllers/project/file/show.js') }}"></script>
    <script src="{{ asset('build/js/controllers/project/file/new.js') }}"></script>
    <script src="{{ asset('build/js/controllers/project/file/edit.js') }}"></script>
    <script src="{{ asset('build/js/controllers/project/file/remove.js') }}"></script>

    <!-- SERVICES -->
    <script src="{{ asset('build/js/services/url.js') }}"></script>
    <script src="{{ asset('build/js/services/user.js') }}"></script>
    <script src="{{ asset('build/js/services/client.js') }}"></script>
    <script src="{{ asset('build/js/services/project.js') }}"></script>
    <script src="{{ asset('build/js/services/projectNote.js') }}"></script>
    <script src="{{ asset('build/js/services/projectFile.js') }}"></script>
    <script src="{{ asset('build/js/services/projectTask.js') }}"></script>

@else
    <script src="{{ elixir('js/all.js') }}"></script>
@endif
</body>
</html>
