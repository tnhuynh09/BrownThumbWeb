if (localStorage.getItem("jwt") == null || localStorage.getItem("jwt") == "") {
    window.location.href = '/';
}

let $username = $("#username");
let $profileImage = $("#profile-image");

$username.html(localStorage.getItem("username"));
$profileImage.attr("src", localStorage.getItem("imageUrl"));

