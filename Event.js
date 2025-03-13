document.addEventListener("DOMContentLoaded", function () {
    // Access elements
    const fullname = document.getElementById('fullname');
    const admission = document.getElementById('admission');
    const password = document.getElementById('password');
    const confirm_password = document.getElementById('confirm_password');
    const fullnameError = document.getElementById('fullname-error');
    const admissionError = document.getElementById('admission-error');
    const passwordError = document.getElementById('password-error');
    const task = document.getElementById('task');
    const addtaskButton = document.getElementById('addTask');
    const totdolist = document.getElementById('upcoming-events-list');


    function checkFullname() {
        const fullnameValue = fullname.value;
        if (!fullnameValue.match(/^[A-Za-z ]+$/)) {
            fullnameError.textContent = "Name should only contain alphabets";
            fullnameError.style.color = "red";
            return false;
        } else {
            fullnameError.textContent = "";
            return true;
        }
    }

    function checkAdmission() {
        const admissionValue = admission.value;
        if (!admissionValue.match(/^\d+$/)) {
            admissionError.textContent = "Admission number should only contain numbers";
            admissionError.style.color = "red";
            return false;
        } else {
            admissionError.textContent = "";
            return true;
        }
    }

    function checkPasswords() {
        if (password.value !== confirm_password.value) {
            passwordError.style.display = "block";
            passwordError.style.color = "red";
            return false;
        } else {
            passwordError.style.display = "none";
            return true;
        }
    }

    // Add event handlers
    fullname.addEventListener('input', checkFullname);
    admission.addEventListener('input', checkAdmission);
    confirm_password.addEventListener('input', checkPasswords);
});

function addtask() {
    const taskValue = task.value;
    const li = document.createElement('div');
    li.className = "item";
    li.textContent = taskValue;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'X';
    li.appendChild(removeButton);

    totdolist.appendChild(li);

    li.addEventListener('click', function(){
        removeButton.remove();
        li.style.textDecoration = 'line-through';
        li.style.color = 'red';
    });
    task.value = "";
}

addtaskButton.addEventListener('click', addtask);
(function () {
    const $body = document.body;
    const $menu_trigger = $body.getElementsByClassName('menu-trigger')[0];

    if (typeof $menu_trigger !== 'undefined') {
        $menu_trigger.addEventListener('click', function () {
            $body.className = ($body.className === 'menu-active') ? '' : 'menu-active';
        });
    }
}).call(this);