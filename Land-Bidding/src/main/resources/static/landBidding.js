var URL = "https://fir-1c7de-default-rtdb.firebaseio.com/demoproject";
const userId = localStorage.getItem("userId");
var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope) {
    $scope.onload = function () {
        $scope.userData = localStorage.getItem("userData");
        $scope.userData = JSON.parse($scope.userData);
        $scope.landDetailsListData = [];
        $scope.landDetails = {};
        getUserLandDetails();
    }
    $scope.getLandData = function (data) {
        $("#ammountId").val(data.biddingPrice);
        $scope.landDetails = data;
    }
    $scope.updateBid = function () {
        if ($("#bidAmmountId").val() == "") {
            alert("Please enter ammount");
        } else {
            if (Number($("#ammountId").val()) >= Number($("#bidAmmountId").val())) {
                alert("Bid ammount should be more than bidding price");
            } else {
                let requestBody = {
                    "biddingPrice": $("#bidAmmountId").val(),
                    "userDetails": $scope.userData
                }
                $.ajax({
                    type: 'patch',
                    contentType: "application/json",
                    dataType: 'json',
                    cache: false,
                    url: URL + "/landBidingUserRegister/" + $scope.landDetails.userId + ".json",
                    data: JSON.stringify(requestBody),
                    success: function (response) {
                        $('#biddingModelId').modal('hide');
                        getUserLandDetails();
                        alert("Data Updated sucessfully!!!");
                    }, error: function (error) {
                        alert("Something went wrong");
                    }
                });
            }
        }
    }
    $scope.logout = function () {
        localStorage.removeItem("userId");
        localStorage.removeItem("userData");
        localStorage.clear();
        window.location.href = "landBiddingLogReg.html";
    }
    function getUserLandDetails() {
        $.ajax({
            type: 'get',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            url: URL + "/landBidingUserRegister.json",
            success: function (response) {
                let loginUserList = [];
                for (let i in response) {
                    let data = response[i];
                    data["userId"] = i;
                    loginUserList.push(data);
                }
                $scope.landDetailsListData = loginUserList.filter((ele) => { return ele.userType == 'landOwer' });
                $scope.$apply();
            }, error: function (error) {
                alert("Something went wrong");
            }
        });
    }
});
