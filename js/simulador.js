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
        img360: "https://pannellum.org/images/alma.jpg",
        acciones: [
            {
                texto: "Analizar alineación de antenas",
                resultado: "📡 Antenas alineadas correctamente. Precisión milimétrica confirmada.",
                color: "#4A90E2"
            },
            {
                texto: "Evaluar calidad de señal",
                resultado: "📊 Señal estable y sin interferencias. Datos científicos válidos.",
                color: "#00B894"
            },
            {
                texto: "Verificar comunicación remota",
                resultado: "🛰️ Comunicación activa con el centro de control.",
                color: "#2D3436"
            }
        ]
    },
    {
        id: "exp2",
        titulo: "Fábrica de Automatización Industrial",
        carrera: "Ingeniería Industrial / Ingeniería Mecatrónica / Ingeniería en Automatización",
        categoria: "Ingeniería",
        entorno: "Planta de Manufactura",
        descripcion: "Explora una fábrica inteligente equipada con brazos robóticos y líneas de ensamblaje automatizadas.",
        icono: "🤖",
        img360: "https://i0.wp.com/www.samrohn.com/wp-content/uploads/chrysler-factory-360-panorama-tour-003.jpg?fit=1200%2C600&ssl=1",
        acciones: [
            {
                texto: "Programar brazo robótico",
                resultado: "🤖 Brazo robótico ejecuta la secuencia correctamente.",
                color: "#6C5CE7"
            },
            {
                texto: "Detectar fallas en línea",
                resultado: "⚠️ Sensor detecta desalineación en estación 3.",
                color: "#D63031"
            },
            {
                texto: "Optimizar producción",
                resultado: "📈 Producción aumentada en un 12%.",
                color: "#00B894"
            }
        ]
    },
    {
        id: "exp3",
        titulo: "Planta Industrial Automatizada",
        carrera: "Ingeniería Industrial / Ingeniería Mecánica / Automatización",
        categoria: "Ingeniería",
        entorno: "Fábrica Industrial",
        descripcion: "Recorre una planta industrial moderna con maquinaria pesada y procesos automatizados.",
        icono: "🏭",
        img360: "../1.png",
        acciones: [
            {
                texto: "Supervisar maquinaria",
                resultado: "🏭 Maquinaria operando dentro de parámetros normales.",
                color: "#0984E3"
            },
            {
                texto: "Controlar flujo de producción",
                resultado: "🔄 Flujo continuo sin cuellos de botella.",
                color: "#00B894"
            }
        ]
    },
    {
        id: "exp4",
        titulo: "Obra de Construcción en Progreso",
        carrera: "Ingeniería Civil / Arquitectura / Construcción",
        categoria: "Ingeniería",
        entorno: "Sitio de Construcción",
        descripcion: "Explora una obra en desarrollo con estructuras y procesos reales.",
        icono: "🚧",
        img360: "../2.jpeg",
        acciones: [
            {
                texto: "Revisar estructura",
                resultado: "🏗️ La estructura cumple con las normas de carga.",
                color: "#E17055"
            },
            {
                texto: "Evaluar seguridad",
                resultado: "🦺 Condiciones de seguridad controladas.",
                color: "#2D3436"
            }
        ]
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
            <div style="grid-column:1/-1;text-align:center;padding:50px;color:#666;">
                <p>No se encontraron experiencias.</p>
            </div>
        `;
        return;
    }

    lista.forEach(exp => {
        const card = document.createElement('div');
        card.className = "oferta-card";
        card.onclick = () => abrirModal(exp);

        card.innerHTML = `
            <div style="color:#4A90E2;font-weight:800;font-size:0.8rem;">
                ${exp.categoria.toUpperCase()}
            </div>

            <div style="background:#F1F2F6;padding:4px 10px;border-radius:20px;font-size:0.75rem;margin:10px 0;">
                ${exp.entorno}
            </div>

            <div style="background:#F1F2F6;width:80px;height:80px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:3rem;margin:15px auto;">
                ${exp.icono}
            </div>

            <h3 style="text-align:center;">${exp.titulo}</h3>

            <p style="font-size:0.85rem;font-weight:600;color:#4A90E2;text-align:center;">
                🎓 ${exp.carrera}
            </p>

            <p style="font-size:0.85rem;color:#636E72;text-align:center;margin:15px 0;">
                ${exp.descripcion}
            </p>

            <button style="width:100%;padding:14px;border-radius:10px;border:none;background:#2D3436;color:white;font-weight:600;">
                Explorar Entorno
            </button>
        `;

        grid.appendChild(card);
    });
}

/*********************************
 * ABRE MODAL + SIMULADOR
 *********************************/
function abrirModal(exp) {
    const modal = document.getElementById('videoModal');
    const container = document.getElementById('panorama-container');
    const actions = document.getElementById('simulatorActions');
    const result = document.getElementById('simulatorResult');

    container.innerHTML = `
        <a-scene embedded>
            <a-assets>
                <img id="skyTexture" src="${exp.img360}">
            </a-assets>
            <a-sky src="#skyTexture" rotation="0 -130 0"></a-sky>
            <a-camera look-controls="reverseMouseDrag:true"></a-camera>
        </a-scene>
    `;

    document.getElementById('modalTitle').innerText = exp.titulo;
    document.getElementById('modalCareer').innerText = exp.carrera;
    document.getElementById('modalDesc').innerText = exp.descripcion;

    actions.innerHTML = "";
    result.style.display = "none";

    exp.acciones.forEach(acc => {
        const btn = document.createElement("button");
        btn.innerText = acc.texto;
        btn.onclick = () => mostrarResultado(acc.resultado);
        btn.style = `
            width:100%;
            padding:12px;
            margin-bottom:10px;
            border-radius:10px;
            border:none;
            background:${acc.color};
            color:white;
            font-weight:600;
            cursor:pointer;
        `;
        actions.appendChild(btn);
    });

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

/*********************************
 * RESULTADO DEL SIMULADOR
 *********************************/
function mostrarResultado(mensaje) {
    const result = document.getElementById('simulatorResult');
    result.innerText = mensaje;
    result.style.display = "block";
}

/*********************************
 * CIERRA MODAL
 *********************************/
function cerrarModal() {
    document.getElementById('videoModal').style.display = "none";
    document.getElementById('panorama-container').innerHTML = "";
    document.getElementById('simulatorResult').style.display = "none";
    document.body.style.overflow = "auto";
}

/*********************************
 * FILTRO
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
 * INIT
 *********************************/
document.addEventListener('DOMContentLoaded', () => {
    renderizarSimuladores(experiencias);
});
