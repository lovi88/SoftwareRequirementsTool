(function () {
    'use strict';

    angular
        .module('app')
        .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$location']; 

    function loginCtrl($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'loginCtrl';

        vm.user = {
            name: "",
            pass: ""
        }
        
        vm.xyz = "";

        vm.loginClick = function (loginForm) {

            if (loginForm.$valid) {
                alert(vm.user.name + " " + vm.user.pass);
            } else {
                alert("invalid model state");
            }

        };

        vm.chkBoxChanged = function () {
            alert("chkBoxChanged");
        };


        activate();
        function activate() { }

    }
})();
