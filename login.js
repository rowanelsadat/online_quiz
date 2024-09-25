document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;

        if (validateLogin(username, password)) {
           
            const storedUsername = localStorage.getItem('username');
            const storedPassword = localStorage.getItem('password');

            if (username === storedUsername && password === storedPassword) {
                alert('Login successful! Redirecting to dashboard...');
                window.location.href = 'dashboard.html'; 
            } else {
                alert('Invalid username or password!');
            }
        }
    });

    function validateLogin(username, password) {
        if (username === '') {
            alert('Username is required!');
            return false;
        }

        if (password === '') {
            alert('Password is required!');
            return false;
        }

        
        return true;
    }
});
