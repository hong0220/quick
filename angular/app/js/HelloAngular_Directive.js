/**
 *模块
 */
var myModule = angular.module("MyModule", []);
// 指令
myModule.directive("hello", function () {
    return {
        restrict: 'E',
        template: '<div>Hi everyone!</div>',
        replace: true
    }
});