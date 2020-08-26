let $signupForm = $("#signup-form");
let $username = $("#username");
let $password = $("#password");
let $signupBtn = $("#signup-btn");
let $error = $("#error");

async function signUp(evt) {
    evt.preventDefault();
    $error.empty();
    let username = $username.val();
    let password = $password.val();
    let result = await apiSignup(username, password, "");

    if (result.data.errors) {
        if (result.data.errors.username) {
            console.log("username errors", result.data.errors.username[0]);
            let error = result.data.errors.username[0];
            $error.append(error);
        } else if (result.data.errors.password) {
            console.log("password errors", result.data.errors.password[0]);
            let error = result.data.errors.password[0];
            $error.append(error);
        }
    } else {
        updateHeader();
        window.location.href = '/';
    }
}

$signupForm.on("submit", signUp);
updateHeader();