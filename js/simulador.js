/*********************************
 * DATA DE EXPERIENCIAS
 *********************************/
const experiencias = [
    {
        id: "exp1",
        titulo: "Observatorio ALMA",
        carrera: "Ingeniería en Astronomía / Ingeniería en Telecomunicaciones",
        categoria: "Ingeniería",
        entorno: "Desierto de Atacama",
        descripcion: "Visualiza la tecnología de antenas de alta precisión en uno de los centros de ingeniería astronómica más avanzados del mundo.",
        icono: "📡",
        img360: "https://pannellum.org/images/alma.jpg"
    }
];

/*********************************
 * RENDERIZA LAS TARJETAS
 *********************************/
function renderizarSimuladores(lista) {
    const grid = document.getElementById('simuladorGrid');
    if (!grid) return;

    grid.innerHTML = "";

    if (lista.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 50px; color: #666;">
                <p>No se encontraron experiencias relacionadas.</p>
            </div>
        `;
        return;
    }

    lista.forEach(exp => {
        const card = document.createElement('div');
        card.className = "oferta-card";
        card.onclick = () => abrirModal(exp);

        card.innerHTML = `
            <div style="color: #4A90E2; font-weight: 800; font-size: 0.8rem; margin-bottom: 5px;">
                ${exp.categoria.toUpperCase()}
            </div>

            <div style="background: #F1F2F6; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; width: fit-content; margin-bottom: 15px;">
                ${exp.entorno}
            </div>

            <div style="background: #F1F2F6; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 3rem; margin: 0 auto 15px auto;">
                ${exp.icono}
            </div>

            <h3 style="font-size: 1.4rem; margin-bottom: 6px; text-align: center;">
                ${exp.titulo}
            </h3>

            <p style="font-size: 0.85rem; font-weight: 600; color: #4A90E2; text-align: center; margin-bottom: 15px;">
                🎓 ${exp.carrera}
            </p>

            <div style="background: #FAFBFC; padding: 10px; border-radius: 10px; margin-bottom: 15px; text-align: center; border: 1px dashed #D1D8E0;">
                <strong style="color: #4A90E2; font-size: 0.9rem;">INMERSIÓN 360°</strong>
            </div>

            <p style="font-size: 0.85rem; color: #636E72; margin-bottom: 25px; line-height: 1.5; text-align: center;">
                ${exp.descripcion}
            </p>

            <button style="background: #2D3436; color: white; border: none; padding: 14px; border-radius: 10px; font-weight: 600; cursor: pointer; width: 100%;">
                Explorar Entorno
            </button>
        `;

        grid.appendChild(card);
    });
}

/*********************************
 * ABRE EL MODAL CON A-FRAME
 *********************************/
function abrirModal(exp) {
    const modal = document.getElementById('videoModal');
    const container = document.getElementById('panorama-container');

    container.innerHTML = `
        <a-scene embedded>
            <a-assets>
                <img id="skyTexture" src="${exp.img360}">
            </a-assets>

            <a-sky src="#skyTexture" rotation="0 -130 0"></a-sky>
            <a-camera look-controls="reverseMouseDrag: true"></a-camera>
        </a-scene>
    `;

    document.getElementById('modalTitle').innerText = exp.titulo;
    document.getElementById('modalCareer').innerText = exp.carrera;
    document.getElementById('modalDesc').innerText = exp.descripcion;

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

/*********************************
 * CIERRA EL MODAL
 *********************************/
function cerrarModal() {
    const modal = document.getElementById('videoModal');
    const container = document.getElementById('panorama-container');

    modal.style.display = "none";
    container.innerHTML = "";
    document.body.style.overflow = "auto";
}

/*********************************
 * FILTRO DE BÚSQUEDA
 *********************************/
function filtrarExperiencias() {
    const query = document.getElementById('searchInput').value.toLowerCase();

    const filtrados = experiencias.filter(e =>
        e.titulo.toLowerCase().includes(query) ||
        e.categoria.toLowerCase().includes(query) ||
        e.entorno.toLowerCase().includes(query) ||
        e.carrera.toLowerCase().includes(query)
    );

    renderizarSimuladores(filtrados);
}

/*********************************
 * INICIALIZACIÓN
 *********************************/
document.addEventListener('DOMContentLoaded', () => {
    renderizarSimuladores(experiencias);
});
