let $username = $("#username");
let $profileImage = $("#profile-image");

$username.html(localStorage.getItem("username"));
$profileImage.attr("src", localStorage.getItem("imageUrl"));