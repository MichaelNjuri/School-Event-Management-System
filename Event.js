// Password validation for signup form
document.addEventListener("DOMContentLoaded", function () {
    var signupForm = document.getElementById("signup-form");

    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            var password = document.getElementById("password").value;
            var confirmPassword = document.getElementById("confirm-password").value;
            var errorMessage = document.getElementById("password-error");

            if (password !== confirmPassword) {
                errorMessage.style.display = "block";
                event.preventDefault(); // Prevent form submission
            } else {
                errorMessage.style.display = "none";
            }
        });
    }
});
