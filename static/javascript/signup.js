let $signupForm = $("#signup-form");
let $username = $("#username");
let $password = $("#password");
let $signupBtn = $("#signup-btn");

async function signUp(evt) {
    evt.preventDefault();
    let username = $username.val();
    let password = $password.val();
    let result = await apiSignup(username, password, "");

    updateHeader();
    window.location.href = '/';
}

$signupForm.on("submit", signUp);
updateHeader();