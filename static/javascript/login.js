let $loginForm = $("#login-form");
let $username = $("#username");
let $password = $("#password");
let $loginBtn = $("#login-btn");
let $error = $("#error");

async function login(evt) {
    evt.preventDefault();
    $error.empty();
    let username = $username.val();
    let password = $password.val();
    let result = await apiLogin(username, password);

    // let errors = Object.keys(result.data.errors).length;

    if (result.data.errors) {
        console.log("nothing to see here");
        console.log("NOTHING!", result.data.errors.errors);
        let error = result.data.errors.errors;
        $error.append(error);
    } else {
        updateHeader();
        window.location.href = '/';
    }
}

$loginForm.on("submit", login);
updateHeader();