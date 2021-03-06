<!DOCTYPE html>
<html lang="pt-br" ng-app="codeProject">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Code Project</title>

    @if(Config::get('app.debug'))
        <link rel="stylesheet" href="{{ asset('build/css/font-awesome.css') }}">
        <link rel="stylesheet" href="{{ asset('build/css/flaticon.css') }}">
        <link rel="stylesheet" href="{{ asset('build/css/components.css') }}">
        <link rel="stylesheet" href="{{ asset('build/css/app.css') }}">
        <link rel="stylesheet" href="{{ asset('build/css/vendor/angular-ui-notification.min.css') }}">
        <link rel="stylesheet" href="{{ asset('build/css/vendor/loading-bar.min.css') }}">
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
<load-template url="build/html/templates/menu.html"></load-template>

<div ng-view></div>

<footer class="footer-global">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <div class="text-center">&copy; Code Project - 2015 by <a href="mailto:adrianodrix@gmail.com">Adriano Santos</a></div>
            </div>
        </div>
    </div>
</footer>

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
    <script src="{{ asset('build/js/vendor/angular-locale_pt-br.js') }}"></script>
    <script src="{{ asset('build/js/vendor/ui-bootstrap-tpls.min.js') }}"></script>
    <script src="{{ asset('build/js/vendor/navbar.min.js') }}"></script>
    <script src="{{ asset('build/js/vendor/angular-cookies.min.js') }}"></script>
    <script src="{{ asset('build/js/vendor/query-string.js') }}"></script>
    <script src="{{ asset('build/js/vendor/angular-oauth2.min.js') }}"></script>
    <script src="{{ asset('build/js/vendor/ng-file-upload.min.js') }}"></script>
    <script src="{{ asset('build/js/vendor/http-auth-interceptor.js') }}"></script>
    <script src="{{ asset('build/js/vendor/dirPagination.js') }}"></script>
    <script src="{{ asset('build/js/vendor/pusher.min.js') }}"></script>
    <script src="{{ asset('build/js/vendor/pusher-angular.min.js') }}"></script>
    <script src="{{ asset('build/js/vendor/angular-ui-notification.min.js') }}"></script>
    <script src="{{ asset('build/js/vendor/moment-with-locales.min.js') }}"></script>
    <script src="{{ asset('build/js/vendor/angular-moment.min.js') }}"></script>
    <script src="{{ asset('build/js/vendor/loading-bar.min.js') }}"></script>
    <script src="{{ asset('build/js/vendor/blob-util.min.js') }}"></script>

    <!-- APP AND CONFIGS -->
    <script src="{{ asset('build/js/app.js') }}"></script>

    <!-- FILTERS -->
    <script src="{{ asset('build/js/filters/cut.js') }}"></script>
    <script src="{{ asset('build/js/filters/date-br.js') }}"></script>
    <script src="{{ asset('build/js/filters/project-status.js') }}"></script>

    <!-- DIRECTIVES -->
    <script src="{{ asset('build/js/directives/projectFileDownload.js') }}"></script>
    <script src="{{ asset('build/js/directives/loginForm.js') }}"></script>
    <script src="{{ asset('build/js/directives/loadTemplate.js') }}"></script>
    <script src="{{ asset('build/js/directives/menuActivated.js') }}"></script>
    <script src="{{ asset('build/js/directives/tabProject.js') }}"></script>
    <script src="{{ asset('build/js/directives/projectStatus.js') }}"></script>

    <!-- CONTROLLERS -->
    <script src="{{ asset('build/js/controllers/loginController.js') }}"></script>
    <script src="{{ asset('build/js/controllers/loginModalController.js') }}"></script>
    <script src="{{ asset('build/js/controllers/refreshModalController.js') }}"></script>
    <script src="{{ asset('build/js/controllers/homeController.js') }}"></script>
    <script src="{{ asset('build/js/controllers/menuController.js') }}"></script>

    <script src="{{ asset('build/js/controllers/client/index.js') }}"></script>
    <script src="{{ asset('build/js/controllers/client/new.js') }}"></script>
    <script src="{{ asset('build/js/controllers/client/edit.js') }}"></script>
    <script src="{{ asset('build/js/controllers/client/remove.js') }}"></script>
    <script src="{{ asset('build/js/controllers/client/dashboard.js') }}"></script>

    <script src="{{ asset('build/js/controllers/project/index.js') }}"></script>
    <script src="{{ asset('build/js/controllers/project/new.js') }}"></script>
    <script src="{{ asset('build/js/controllers/project/show.js') }}"></script>
    <script src="{{ asset('build/js/controllers/project/edit.js') }}"></script>
    <script src="{{ asset('build/js/controllers/project/remove.js') }}"></script>
    <script src="{{ asset('build/js/controllers/project/dashboard.js') }}"></script>
    <script src="{{ asset('build/js/controllers/project/members.js') }}"></script>

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
    <script src="{{ asset('build/js/services/oAuthFixInterceptor.js') }}"></script>
    <script src="{{ asset('build/js/services/user.js') }}"></script>
    <script src="{{ asset('build/js/services/client.js') }}"></script>
    <script src="{{ asset('build/js/services/project.js') }}"></script>
    <script src="{{ asset('build/js/services/projectNote.js') }}"></script>
    <script src="{{ asset('build/js/services/projectFile.js') }}"></script>
    <script src="{{ asset('build/js/services/projectTask.js') }}"></script>
    <script src="{{ asset('build/js/services/projectMember.js') }}"></script>
@else
    <script src="{{ elixir('js/all.js') }}"></script>
@endif
</body>
</html>
