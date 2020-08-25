
let $profileImage = $("#profile-image");
let $editUserForm = $("#edit-user-form");
let $username = $("#username-handle");
let $imageUrl = $("#inputImageUrl");
let $editUserBtn = $("#edit-profile-btn");

$profileImage.attr("src", localStorage.getItem("imageUrl"));
$username.append("USERNAME: " + localStorage.getItem("username"));
// $username.html(localStorage.getItem("username"));

async function editProfile(evt) {
    evt.preventDefault();

    let userId = localStorage.getItem("userId");
    let imageUrl = $imageUrl.val();
    let result = await apiEditUserProfile(userId, imageUrl);

    updateHeader();
    window.location.href = '/account';
}

$editUserForm.on("submit", editProfile);
updateHeader();






