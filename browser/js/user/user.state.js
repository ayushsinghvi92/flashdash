app.config(function ($stateProvider) {
    $stateProvider.state('user', {
        data: {authenticate: true},
        url: '/myAccount',
        controller: 'userCtrl',
        templateUrl: 'js/user/user.html'
    });
});
