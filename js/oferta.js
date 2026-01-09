/**
 * BASE DE DATOS DE CARRERAS
 * Puedes añadir o quitar carreras aquí siguiendo el mismo formato.
 */
const carreras = [
    {
        nombre: "Medicina",
        universidad: "U. de Chile",
        area: "Salud",
        empleabilidad: "98%",
        corte: "895.4",
        duracion: "14 semestres",
        sede: "Casa Central",
        arancel: "$9.2M"
    },
    {
        nombre: "Ingeniería Civil",
        universidad: "PUC",
        area: "Ingeniería",
        empleabilidad: "95%",
        corte: "840.1",
        duracion: "11 semestres",
        sede: "San Joaquín",
        arancel: "$8.5M"
    },
    {
        nombre: "Derecho",
        universidad: "U. de Concepción",
        area: "Leyes",
        empleabilidad: "82%",
        corte: "760.2",
        duracion: "10 semestres",
        sede: "Concepción",
        arancel: "$5.4M"
    },
    {
        nombre: "Psicología",
        universidad: "UDP",
        area: "Ciencias Sociales",
        empleabilidad: "75%",
        corte: "710.8",
        duracion: "10 semestres",
        sede: "Santiago Centro",
        arancel: "$6.1M"
    },
    {
        nombre: "Arquitectura",
        universidad: "UTFSM",
        area: "Diseño y Const.",
        empleabilidad: "88%",
        corte: "745.3",
        duracion: "11 semestres",
        sede: "Valparaíso",
        arancel: "$5.9M"
    },
    {
        nombre: "Enfermería",
        universidad: "U. de Valparaíso",
        area: "Salud",
        empleabilidad: "92%",
        corte: "790.0",
        duracion: "10 semestres",
        sede: "Viña del Mar",
        arancel: "$5.2M"
    },
    {
        nombre: "Odontología",
        universidad: "U. de los Andes",
        area: "Salud",
        empleabilidad: "91%",
        corte: "815.6",
        duracion: "12 semestres",
        sede: "San Carlos de Apoquindo",
        arancel: "$10.1M"
    },
    {
        nombre: "Pedagogía Básica",
        universidad: "UMCE",
        area: "Educación",
        empleabilidad: "89%",
        corte: "620.4",
        duracion: "10 semestres",
        sede: "Ñuñoa",
        arancel: "$3.8M"
    },
    {
        nombre: "Med. Veterinaria",
        universidad: "U. Mayor",
        area: "Salud Animal",
        empleabilidad: "78%",
        corte: "735.9",
        duracion: "10 semestres",
        sede: "Huechuraba",
        arancel: "$6.4M"
    },
    {
        nombre: "Ing. Comercial",
        universidad: "U. Adolfo Ibáñez",
        area: "Negocios",
        empleabilidad: "94%",
        corte: "785.2",
        duracion: "10 semestres",
        sede: "Peñalolén",
        arancel: "$7.9M"
    }
];

// Referencias al DOM
const ofertaGrid = document.getElementById('ofertaGrid');
const searchInput = document.getElementById('searchInput');

/**
 * RENDERIZA LAS TARJETAS EN EL HTML
 * @param {Array} lista - Array de objetos de carreras
 */
function renderizarCarreras(lista) {
    // Limpiar el grid antes de renderizar
    ofertaGrid.innerHTML = '';

    if (lista.length === 0) {
        ofertaGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 50px; color: #666;">
                <p>No se encontraron carreras o universidades que coincidan con tu búsqueda.</p>
            </div>
        `;
        return;
    }

    lista.forEach(carrera => {
        const card = document.createElement('div');
        card.className = 'oferta-card';
        
        card.innerHTML = `
            <div class="uni-badge">${carrera.universidad}</div>
            <div class="category-tag">${carrera.area}</div>
            <h3>${carrera.nombre}</h3>
            
            <div class="stats-mini">
                <div class="s-item">
                    <strong>${carrera.empleabilidad}</strong>
                    <span>Empleabilidad</span>
                </div>
                <div class="s-item">
                    <strong>${carrera.corte}</strong>
                    <span>Corte 2024</span>
                </div>
            </div>

            <div class="info-row">
                <span>Duración: ${carrera.duracion}</span><br>
                <span>Sede: ${carrera.sede}</span>
            </div>

            <div class="price-tag">Arancel: ${carrera.arancel} / año</div>
            
            <button class="btn-black" onclick="verDetalles('${carrera.nombre}')">Ver detalles</button>
        `;
        
        ofertaGrid.appendChild(card);
    });
}

/**
 * FILTRA LA LISTA BASADO EN EL INPUT
 */
searchInput.addEventListener('input', (e) => {
    const terminoBusqueda = e.target.value.toLowerCase();
    
    const carrerasFiltradas = carreras.filter(c => {
        return c.nombre.toLowerCase().includes(terminoBusqueda) || 
               c.universidad.toLowerCase().includes(terminoBusqueda);
    });
    
    renderizarCarreras(carrerasFiltradas);
});

/**
 * FUNCIÓN PARA EL BOTÓN (Opcional)
 */
function verDetalles(nombreCarrera) {
    alert("Pronto verás más información sobre: " + nombreCarrera);
}

// Carga inicial
document.addEventListener('DOMContentLoaded', () => {
    renderizarCarreras(carreras);
});