/*Created by sandeeptc on 7/28/16.*/

var app=angular.module('CoffeeApp',['ngRoute']).run(function($rootScope,$http){
    $rootScope.authenticated=false;
    $rootScope.current_user= "";

$rootScope.logout=function(){
    $http.get('/auth/signout');
    $rootScope.authenticated=false;
    $rootScope.current_user= "";
    $location.place('/templates/login');
};

});

    app.config(function($routeProvider ){
        //to make the URL insensitive, use the below line.
        $routeProvider.caseInsensitiveMatch=true;
        $routeProvider
            .when("/index",{
                templateUrl:"templates/corousel.html",
                controller:"mainController",
                caseInsensitiveMatch:true
            })
            .when("/Activity",{
                templateUrl:"templates/Activity.html",
                controller:"ActivityController"
            })
            .when("/wallet",{
                templateUrl:"templates/wallet.html",
                controller:"walletController"
            })
            .when("/Details",{
                templateUrl:"templates/Details.html",
                controller:"DetailsController",
                caseInsensitiveMatch:true
            })
            .when("/signup_form",{
                templateUrl:"templates/signup_form.html",
                controller:"authController",
                caseInsensitiveMatch:true
            })
            .when("/login",{
                templateUrl:"templates/login.html",
                controller:"authController",
                caseInsensitiveMatch:true
            })
            .when("/contact",{
                templateUrl:"templates/contact.html",
                controller:"contactController",
                caseInsensitiveMatch:true
            })
            .when("/about",{
                templateUrl:"templates/about.html",
                controller:"aboutController",
                caseInsensitiveMatch:true
            })
            .when("/profile",{
                templateUrl:"templates/profile.html",
                controller:"profileController",
                caseInsensitiveMatch:true
            })

            //TO make index page as the Default routing page.
            .otherwise({
                redirectTo:"/index"
            });
        });

    app.controller('mainController',function($scope){

                });

    app.controller('authController',function($scope,$rootScope,$http,$location){
        //$scope.user={username:'',firstname:'',lastname:'',email:'',password:'',phone:''};
        $scope.error_message='';

        $scope.signup=function(){
          //$scope.error_message='signup request for ' + $scope.user.email;
            console.log($scope.user);
            $http.post('/auth/signup',$scope.user).success(function(data){
                $rootScope.authenticated = true;
                $rootScope.current_user=data.user.firstname;
                $location.path('/templates/add_card.html').replace();
            });


        };
        $scope.login=function(){
            //$scope.error_message='signup request for ' + $scope.user.email;
            console.log($scope.user);
            $http.post('/auth/login',$scope.user).success(function(data){
                $rootScope.authenticated = true;
                $rootScope.current_user=data.user.username;
                $location.path('/');
            });

        };

    });

    app.controller("ActivityController",function($scope){
        $scope.message="Activity";
    })
    .controller("walletController",function($scope){
        $scope.message="Bank Account and Cards on File";
    })
    .controller("DetailsController",function($scope){
        $scope.message="Details";
    })

    .controller("contactController",function($scope){

        })
    .controller("aboutController",function($scope){

        })

    .controller("profileController",function($scope){

        })
