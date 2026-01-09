const experiencias = [
    {
        id: "npEv3YZLSMs",
        titulo: "Ingeniería y Automatización",
        categoria: "Ingeniería",
        entorno: "Planta Industrial",
        descripcion: "Observa el diseño de maquinaria pesada y la programación de brazos robóticos en una planta de alta tecnología.",
        icono: "🤖",
        duracion: "3:45"
    },
    {
        id: "Y2tdeXuEDP4",
        titulo: "Pabellón Quirúrgico",
        categoria: "Medicina",
        entorno: "Hospital Clínico",
        descripcion: "Entra en una sala de operaciones real y observa la disposición del equipo médico durante una intervención.",
        icono: "🏥",
        duracion: "2:15"
    },
    {
        id: "HEEIzZ7UjRg",
        titulo: "Cabina de Vuelo (Piloto)",
        categoria: "Aviación",
        entorno: "Airbus A320",
        descripcion: "Vive la experiencia de estar en la cabina de mando durante un despegue y aterrizaje real.",
        icono: "✈️",
        duracion: "5:30"
    },
    {
        id: "yaTyUUvHx1s",
        titulo: "Facultad de Medicina",
        categoria: "Educación",
        entorno: "Campus Universitario",
        descripcion: "Recorre los laboratorios de anatomía y los modernos centros de simulación para estudiantes.",
        icono: "🏛️",
        duracion: "4:05"
    },
    {
        id: "3tzDSZzjKuw",
        titulo: "Ingeniería Biomédica",
        categoria: "Ciencias",
        entorno: "Laboratorio I+D",
        descripcion: "Explora cómo se desarrolla la tecnología médica para mejorar la calidad de vida de las personas.",
        icono: "🧬",
        duracion: "3:20"
    },
    {
        id: "rcOocUjDYEw",
        titulo: "Arquitectura y Diseño",
        categoria: "Arquitectura",
        entorno: "Edificio Patrimonial",
        descripcion: "Estudia la gestión de espacios, estructuras y diseño arquitectónico en un entorno histórico.",
        icono: "📐",
        duracion: "2:50"
    },
    {
        id: "6uunXasL_eU",
        titulo: "Laboratorio de Biotecnología",
        categoria: "Ciencias",
        entorno: "Centro de Investigación",
        descripcion: "Entra a un entorno estéril de alta seguridad donde se realizan pruebas moleculares.",
        icono: "🧪",
        duracion: "4:20"
    }
];

function renderizarSimuladores(lista) {
    const grid = document.getElementById('simuladorGrid');
    if (!grid) return;

    grid.innerHTML = "";

    lista.forEach(exp => {
        const card = document.createElement('div');
        card.className = "oferta-card";
        card.onclick = () => abrirModal(exp);

        card.innerHTML = `
            <div class="uni-badge" style="color: #4A90E2; font-weight: 800; font-size: 0.8rem; margin-bottom: 5px;">
                ${exp.categoria.toUpperCase()}
            </div>
            <div class="category-tag" style="background: #F1F2F6; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; width: fit-content; margin-bottom: 15px;">
                ${exp.entorno}
            </div>
            
            <div class="icon-placeholder" style="background: #F1F2F6; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 3rem; margin-bottom: 15px;">
                ${exp.icono}
            </div>

            <h3 style="font-size: 1.4rem; margin-bottom: 15px;">${exp.titulo}</h3>

            <div style="display: flex; justify-content: space-between; background: #FAFBFC; padding: 12px; border-radius: 10px; margin-bottom: 15px;">
                <div style="text-align: left;">
                    <strong style="display: block; color: #4A90E2; font-size: 1.1rem;">360°</strong>
                    <span style="font-size: 0.7rem; color: #636E72;">Formato</span>
                </div>
                <div style="text-align: right;">
                    <strong style="display: block; color: #4A90E2; font-size: 1.1rem;">${exp.duracion}</strong>
                    <span style="font-size: 0.7rem; color: #636E72;">Duración</span>
                </div>
            </div>

            <p style="font-size: 0.85rem; color: #636E72; margin-bottom: 25px; line-height: 1.5; flex-grow: 1;">
                ${exp.descripcion}
            </p>
            
            <button class="btn-black" style="background: #2D3436; color: white; border: none; padding: 14px; border-radius: 10px; font-weight: 600; cursor: pointer; width: 100%; transition: background 0.3s;">
                Iniciar Experiencia
            </button>
        `;
        grid.appendChild(card);
    });
}

function abrirModal(exp) {
    const modal = document.getElementById('videoModal');
    document.getElementById('modalIframe').src = `https://www.youtube.com/embed/${exp.id}?autoplay=1`;
    document.getElementById('modalTitle').innerText = exp.titulo;
    document.getElementById('modalDesc').innerText = exp.descripcion;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function cerrarModal() {
    document.getElementById('videoModal').style.display = "none";
    document.getElementById('modalIframe').src = "";
    document.body.style.overflow = "auto";
}

function filtrarExperiencias() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtrados = experiencias.filter(e => 
        e.titulo.toLowerCase().includes(query) || e.categoria.toLowerCase().includes(query)
    );
    renderizarSimuladores(filtrados);
}

document.addEventListener('DOMContentLoaded', () => renderizarSimuladores(experiencias));