const preguntasM2 = [
    { 
        id: 1, 
        pregunta: "¿Cuál es el conjunto solución para la logaritmo $\log_x(16) = 2$?", 
        opciones: ["x = 4", "x = 8", "x = 32", "x = 2"], 
        correcta: 0 
    },
    { 
        id: 2, 
        pregunta: "En una progresión aritmética, si el primer término es 3 y la diferencia es 5, ¿cuál es el décimo término?", 
        opciones: ["45", "48", "53", "50"], 
        correcta: 1 
    }
];

let paginaActual = 0;
const preguntasPorPagina = 10;
let respuestasUsuario = {}; 
let examenFinalizado = false;

const wrapper = document.getElementById('questionsWrapper');
const pageIndicator = document.getElementById('pageIndicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const timerDisplay = document.getElementById('timerDisplay');
const finishBtn = document.getElementById('finishBtn');

function renderizarPagina() {
    if(!wrapper) return;
    wrapper.innerHTML = "";
    
    const inicio = paginaActual * preguntasPorPagina;
    const fin = inicio + preguntasPorPagina;
    const preguntasVisibles = preguntasM2.slice(inicio, fin);

    preguntasVisibles.forEach((p) => {
        const card = document.createElement('div');
        card.className = 'question-card';
        
        let opcionesHTML = "";
        p.opciones.forEach((opcion, index) => {
            let clases = "option-item";
            if (respuestasUsuario[p.id] === index) clases += " selected";

            if (examenFinalizado) {
                if (index === p.correcta) clases += " correct";
                else if (respuestasUsuario[p.id] === index) clases += " wrong";
            }

            opcionesHTML += `<div class="${clases}" onclick="registrarRespuesta(${p.id}, ${index})">${opcion}</div>`;
        });

        card.innerHTML = `<h3>${p.id}. ${p.pregunta}</h3><div class="options-list">${opcionesHTML}</div>`;
        wrapper.appendChild(card);
    });
    actualizarInterfaz();
}

window.registrarRespuesta = function(preguntaId, opcionIndice) {
    if (examenFinalizado) return;
    respuestasUsuario[preguntaId] = opcionIndice;
    renderizarPagina();
};

function actualizarInterfaz() {
    const totalPaginas = Math.ceil(preguntasM2.length / preguntasPorPagina);
    if(pageIndicator) pageIndicator.innerText = `Página ${paginaActual + 1} de ${totalPaginas}`;
    if(prevBtn) prevBtn.disabled = paginaActual === 0;
    if(nextBtn) nextBtn.disabled = (paginaActual + 1) >= totalPaginas;
}

if(nextBtn) nextBtn.onclick = () => { paginaActual++; renderizarPagina(); window.scrollTo(0, 0); };
if(prevBtn) prevBtn.onclick = () => { paginaActual--; renderizarPagina(); window.scrollTo(0, 0); };

if(finishBtn) {
    finishBtn.onclick = function() {
        if (!confirm("¿Deseas finalizar el ensayo M2?")) return;

        examenFinalizado = true;
        let correctas = 0, incorrectas = 0, omitidas = 0;

        preguntasM2.forEach(p => {
            const r = respuestasUsuario[p.id];
            if (r === undefined) omitidas++;
            else if (r === p.correcta) correctas++;
            else incorrectas++;
        });

        const porcentaje = Math.round((correctas / preguntasM2.length) * 100);

        document.getElementById('examArea').classList.add('hidden');
        document.getElementById('resultsArea').classList.remove('hidden');
        finishBtn.style.display = 'none'; 
        
        document.getElementById('correctCount').innerText = correctas;
        document.getElementById('incorrectCount').innerText = incorrectas;
        document.getElementById('omitCount').innerText = omitidas;
        document.getElementById('ratioDisplay').innerText = `${correctas} / ${preguntasM2.length}`;
        document.getElementById('percentageText').innerText = `${porcentaje}%`;

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
}

let tiempoSegundos = (2 * 3600) + (20 * 60);
const cuentaRegresiva = setInterval(() => {
    if (examenFinalizado) { clearInterval(cuentaRegresiva); return; }
    tiempoSegundos--;
    let h = Math.floor(tiempoSegundos / 3600);
    let m = Math.floor((tiempoSegundos % 3600) / 60);
    let s = tiempoSegundos % 60;
    if(timerDisplay) timerDisplay.innerText = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    if (tiempoSegundos <= 0) { clearInterval(cuentaRegresiva); finishBtn.click(); }
}, 1000);

renderizarPagina();