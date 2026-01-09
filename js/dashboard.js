/* =========================================
   LÓGICA DEL DASHBOARD
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Saludo Personalizado según la hora del día
    const welcomeText = document.getElementById('welcome-text');
    if (welcomeText) {
        const hora = new Date().getHours();
        let saludo = "¡Hola!";

        if (hora >= 5 && hora < 12) saludo = "¡Buenos días!";
        else if (hora >= 12 && hora < 20) saludo = "¡Buenas tardes!";
        else saludo = "¡Buenas noches!";

        // Puedes cambiar 'Usuario' por el nombre real si usas variables de sesión más adelante
        welcomeText.innerText = `${saludo} Bienvenid@ a tu panel.`;
    }

    // 2. Manejo de Enlaces Activos en la Sidebar
    // Esto asegura que el usuario sepa en qué página está
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.sidebar-link');

    navLinks.forEach(link => {
        if (currentPath.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
});

/* =========================================
   FUNCIONES GLOBALES
   ========================================= */

/**
 * Muestra una notificación temporal (Toast) en la parte inferior
 * @param {string} mensaje - El texto a mostrar
 */
function showToast(mensaje) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.innerText = mensaje;
        toast.classList.add('show');
        
        // Se oculta automáticamente después de 3 segundos
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

/**
 * Confirmación antes de cerrar sesión
 */
const btnLogout = document.querySelector('.btn-logout');
if (btnLogout) {
    btnLogout.addEventListener('click', (e) => {
        const confirmar = confirm("¿Estás seguro de que deseas cerrar sesión?");
        if (!confirmar) {
            e.preventDefault(); // Cancela la redirección si el usuario dice que no
        }
    });
}