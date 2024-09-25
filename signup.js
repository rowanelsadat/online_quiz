document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const username = document.getElementById('signupUsername').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (validateForm(username, email, password, confirmPassword)) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            alert('Sign Up successful! Redirecting to login page...');
            window.location.href = 'login.html';
        }
    });

    function validateForm(username, email, password, confirmPassword) {
        if (username === '') {
            alert('Username is required!');
            return false;
        }

        if (email === '') {
            alert('Email is required!');
            return false;
        }

        if (password === '') {
            alert('Password is required!');
            return false;
        }

        if (confirmPassword === '') {
            alert('Please confirm your password!');
            return false;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Invalid email format!');
            return false;
        }

        return true;
    }
});
