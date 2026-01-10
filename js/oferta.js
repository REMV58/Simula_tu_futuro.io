const carreras = [
{
        nombre: "Medicina",
        universidad: "USACH",
        area: "Salud",
        empleabilidad: "97%",
        corte: "882.3", // Puntaje de corte referencial
        duracion: "14 semestres",
        sede: "Campus Único (Estación Central)",
        arancel: "$7.8M",
        pruebas: ["M1", "M2"],
        ponderaciones: { 
            nem: "20%", 
            ran: "20%", 
            len: "10%", 
            mat1: "20%", 
            mat2: "10%", 
            cie: "20%" 
        },
        malla: "https://vra.usach.cl/sites/vra/files/paginas/facimed_-_medicina_2024.pdf"
    },
    {
        nombre: "Ingeniería Civil",
        universidad: "PUC",
        area: "Ingeniería",
        empleabilidad: "95%",
        corte: "840.1",
        duracion: "11 semestres",
        sede: "San Joaquín",
        arancel: "$8.5M",
        pruebas: ["M1", "M2"],
        ponderaciones: { nem: "10%", ran: "25%", len: "10%", mat1: "35%", mat2: "10%", cie: "10%" },
        malla: "https://ing.puc.cl/malla-curricular/"
    },
    {
        nombre: "Derecho",
        universidad: "U. de Concepción",
        area: "Leyes",
        empleabilidad: "82%",
        corte: "760.2",
        duracion: "10 semestres",
        sede: "Concepción",
        arancel: "$5.4M",
        pruebas: ["M1"],
        ponderaciones: { nem: "20%", ran: "20%", len: "30%", mat1: "15%", hist: "15%" },
        malla: "https://admision.udec.cl/wp-content/uploads/2020/09/Malla-Derecho.pdf"
    },
    {
        nombre: "Psicología",
        universidad: "UDP",
        area: "Ciencias Sociales",
        empleabilidad: "75%",
        corte: "710.8",
        duracion: "10 semestres",
        sede: "Santiago Centro",
        arancel: "$6.1M",
        pruebas: ["M1"],
        ponderaciones: { nem: "15%", ran: "25%", len: "25%", mat1: "15%", hist: "20%" },
        malla: "https://psicologia.udp.cl/cms/wp-content/uploads/2023/12/MALLA-PSICOLOGIA-2024.pdf"
    },
    {
        nombre: "Arquitectura",
        universidad: "  ",
        area: "Diseño y Const.",
        empleabilidad: "88%",
        corte: "745.3",
        duracion: "11 semestres",
        sede: "Valparaíso",
        arancel: "$5.9M",
        pruebas: ["M1"],
        ponderaciones: { nem: "10%", ran: "20%", len: "10%", mat1: "40%", cie: "20%" },
        malla: "https://usm.cl/wp-content/uploads/2025/09/ARQUI-2048x954.webp"
    }
];

const ofertaGrid = document.getElementById('ofertaGrid');
const searchInput = document.getElementById('searchInput');

function renderizarCarreras(lista) {
    ofertaGrid.innerHTML = '';

    if (lista.length === 0) {
        ofertaGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 50px; color: #666;">
                <p>No se encontraron resultados para tu búsqueda.</p>
            </div>`;
        return;
    }

    lista.forEach(carrera => {
        const card = document.createElement('div');
        card.className = 'oferta-card';
        
        // Generar etiquetas para M1 y M2 con colores distintos
        let pruebasHTML = carrera.pruebas.map(p => 
            `<span style="background: ${p === 'M2' ? '#E74C3C' : '#3498DB'}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.65rem; margin-left: 4px; font-weight: bold;">${p}</span>`
        ).join('');

        // Generar detalle de ponderaciones
        let ponderacionHTML = '';
        for (const [prueba, valor] of Object.entries(carrera.ponderaciones)) {
            ponderacionHTML += `<div class="p-tag"><strong>${prueba.toUpperCase()}:</strong> ${valor}</div>`;
        }
        
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
                <div class="uni-badge">${carrera.universidad}</div>
                <div>${pruebasHTML}</div>
            </div>
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

            <div class="ponderaciones-container" style="background: #f8fafc; border: 1px solid #DFE6E9; border-radius: 10px; padding: 12px; margin-bottom: 15px;">
                <span style="font-size: 0.7rem; font-weight: 700; color: #636E72; display: block; margin-bottom: 8px; text-transform: uppercase;">Detalle Ponderaciones:</span>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px;">
                    ${ponderacionHTML}
                </div>
            </div>

            <div class="info-row" style="font-size: 0.85rem; color: #636E72; margin-bottom: 15px; border-top: 1px dashed #DFE6E9; padding-top: 10px;">
                <span><strong>Duración:</strong> ${carrera.duracion}</span><br>
                <span><strong>Sede:</strong> ${carrera.sede}</span>
            </div>

            <div class="price-tag" style="font-weight: 700; color: #2ECC71; margin-bottom: 12px;">
                Arancel: ${carrera.arancel} / año
            </div>

            <button class="btn-malla" 
                onclick="window.open('${carrera.malla}', '_blank')" 
                style="width: 100%; padding: 10px; background: #34495E; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 0.8rem; font-weight: 600; transition: background 0.3s;">
                Ver Malla Curricular 📄
            </button>
        `;
        
        ofertaGrid.appendChild(card);
    });
}

// Evento de búsqueda (Filtra por nombre de carrera o universidad)
searchInput.addEventListener('input', (e) => {
    const termino = e.target.value.toLowerCase();
    const filtradas = carreras.filter(c => 
        c.nombre.toLowerCase().includes(termino) || 
        c.universidad.toLowerCase().includes(termino)
    );
    renderizarCarreras(filtradas);
});

// Carga inicial al abrir la página
document.addEventListener('DOMContentLoaded', () => renderizarCarreras(carreras));