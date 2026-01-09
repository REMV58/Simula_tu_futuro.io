document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginCard = document.getElementById('loginCard');
    const errorMsg = document.getElementById('error-msg');
    const userInput = document.getElementById('usuario');
    const passInput = document.getElementById('password');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const user = userInput.value.trim();
        const pass = passInput.value.trim();

        if (user.length >= 5 && pass.length >= 5) {
            window.location.href = "dashboard.html";
        } else {
            errorMsg.innerText = "❌ Mínimo 5 caracteres en ambos campos";
            errorMsg.style.display = "block";
            loginCard.classList.add('shake');
            setTimeout(() => loginCard.classList.remove('shake'), 400);
        }
    });

    [userInput, passInput].forEach(input => {
        input.addEventListener('input', () => {
            errorMsg.style.display = "none";
        });
    });
});