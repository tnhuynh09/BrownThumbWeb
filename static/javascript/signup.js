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
    // let errors = Object.keys(result.data.errors).length;
    // let username_errors = Object.keys(result.data.errors.username).length;
    // let password_errors = Object.keys(result.data.errors.password).length;

    if (result.data.errors) {
        console.log("nothing to see here");
        console.log("NOTHING!", result.data.errors);
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

    // console.log("apiSignup --- response", result);
    // console.log("apiSignup --- DATA", result.data);
    // console.log("apiSignup --- DATA", result.data.errors.username[0]);
}

$signupForm.on("submit", signUp);
updateHeader();