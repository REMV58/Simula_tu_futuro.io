const preguntasCiencias = [
    {
        id: 1,
        pregunta: "¿Qué organelo es el encargado de la síntesis de ATP en la célula eucarionte?",
        opciones: ["Lisosoma", "Cloroplasto", "Mitocondria", "Ribosoma"],
        correcta: 2
    },
    {
        id: 2,
        pregunta: "En una cadena trófica, ¿qué ocurre con la energía a medida que se avanza hacia niveles tróficos superiores?",
        opciones: [
            "Se mantiene constante",
            "Aumenta exponencialmente",
            "Disminuye progresivamente",
            "Se recicla totalmente"
        ],
        correcta: 2
    }
    // Añadir hasta completar las 80
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
    const preguntasVisibles = preguntasCiencias.slice(inicio, fin);

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
    const totalPaginas = Math.ceil(preguntasCiencias.length / preguntasPorPagina);
    if(pageIndicator) pageIndicator.innerText = `Página ${paginaActual + 1} de ${totalPaginas}`;
    if(prevBtn) prevBtn.disabled = paginaActual === 0;
    if(nextBtn) nextBtn.disabled = (paginaActual + 1) >= totalPaginas;
}

if(nextBtn) nextBtn.onclick = () => { paginaActual++; renderizarPagina(); window.scrollTo(0, 0); };
if(prevBtn) prevBtn.onclick = () => { paginaActual--; renderizarPagina(); window.scrollTo(0, 0); };

if(finishBtn) {
    finishBtn.onclick = function() {
        if (!confirm("¿Deseas finalizar el ensayo de Ciencias?")) return;
        examenFinalizado = true;
        let c = 0, i = 0, o = 0;
        preguntasCiencias.forEach(p => {
            const r = respuestasUsuario[p.id];
            if (r === undefined) o++;
            else if (r === p.correcta) c++;
            else i++;
        });
        document.getElementById('examArea').classList.add('hidden');
        document.getElementById('resultsArea').classList.remove('hidden');
        finishBtn.style.display = 'none'; 
        document.getElementById('correctCount').innerText = c;
        document.getElementById('incorrectCount').innerText = i;
        document.getElementById('omitCount').innerText = o;
        document.getElementById('ratioDisplay').innerText = `${c} / ${preguntasCiencias.length}`;
        document.getElementById('percentageText').innerText = `${Math.round((c/preguntasCiencias.length)*100)}%`;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
}

let tiempo = (2 * 3600) + (40 * 60);
const timerInterval = setInterval(() => {
    if (examenFinalizado) { clearInterval(timerInterval); return; }
    tiempo--;
    let h = Math.floor(tiempo / 3600), m = Math.floor((tiempo % 3600) / 60), s = tiempo % 60;
    if(timerDisplay) timerDisplay.innerText = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
    if(tiempo <= 0) { clearInterval(timerInterval); finishBtn.click(); }
}, 1000);

renderizarPagina();