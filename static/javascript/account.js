let $username = $("#username");
let $profileImage = $("#profile-image");

$username.html(localStorage.getItem("username"));
console.log("test")
$profileImage.attr("src", localStorage.getItem("imageUrl"));