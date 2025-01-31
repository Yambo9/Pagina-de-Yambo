// app.js
const { useState, useEffect } = React;

// Frases
const FRASES_NORMALES = [
  "¡Hola! Soy Yambo, tu mascota artística.",
  "¡Espero que disfrutes navegando por mi galería!",
  "¿Sabías que el arte es una forma de expresión infinita?",
  "¡Gracias por visitar mi sitio!",
  "¡No olvides revisar las nuevas obras en la sección 'Obras'!",
  "¡Estoy aquí para hacerte sonreír!",
  "¿Te gusta el arte digital? ¡A mí también!",
  "¡Sigue creando y explorando!",
  "¡La creatividad no tiene límites!",
  "¡Hasta la próxima!"
];
const FRASES_BIZARRO = [
  "DETENGANLOOOOO!!!",
  "NO PUEDO CONTROLARME",
  "AAAAHHHHHHHH!!!",
  "EL CAOS SE APODERA DE MI SER",
  "QUE ALGUIEN PONGA ORDEN",
  "ESTO ES UNA LOCURA",
  "S.O.S",
  "NECESITO AYUDAAAAA!",
  "SOY UNA VICTIMA DE MI PROPIO PODER",
  "DEVUELVAN EL ORDEN, CONCHETUMARE!"
];

function initCarousel(interval) {
  const crazyCarousel = document.getElementById("crazyCarousel");
  if (!crazyCarousel) return null;

  // Dispose previa instancia
  const prev = bootstrap.Carousel.getInstance(crazyCarousel);
  if (prev) {
    prev.dispose();
  }
  // Crea la nueva
  const newCar = new bootstrap.Carousel(crazyCarousel, {
    interval,
    ride: "carousel",
    wrap: true
  });
  return newCar;
}

function App() {
  const [bizarro, setBizarro] = useState(false);
  const [indice, setIndice] = useState(0);
  const [mostrarTexto, setMostrarTexto] = useState(false);

  // Iniciar carrusel normal
  useEffect(() => {
    initCarousel(5000);
  }, []);

  // Observa bizarro => color, carrusel
  useEffect(() => {
    let colorInt = null;
    const overlay = document.querySelector(".bsod-overlay");
    const mascota = document.querySelector(".mascota");

    if (bizarro) {
      // ENCIENDE BIZARRO
      document.body.classList.add("bizarro-active");
      colorInt = setInterval(() => {
        document.body.style.backgroundColor =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
      }, 300);
      initCarousel(33);

      if (mascota) {
        mascota.classList.remove("bsod-pause"); // por si se quedo
      }
    } else {
      // APAGANDO BIZARRO => No hacemos pantallazo azul aquí,
      // LO HAREMOS en la toggleBizarro (ver mas abajo)
      document.body.classList.remove("bizarro-active");
      document.body.style.backgroundColor = "";
      initCarousel(5000);

      if (mascota) {
        mascota.classList.remove("bizarro-move");
      }
    }

    return () => {
      clearInterval(colorInt);
    };
  }, [bizarro]);

  // Frases
  const FR = bizarro ? FRASES_BIZARRO : FRASES_NORMALES;

  // Click mascota => normal
  const clickMascota = () => {
    if (bizarro) return;
    setMostrarTexto(true);
    setIndice((prev) => (prev + 1) % FR.length);
    setTimeout(() => setMostrarTexto(false), 3000);
  };

  // Bizarro => loop
  useEffect(() => {
    let loopI = null;
    if (bizarro) {
      setMostrarTexto(true);
      loopI = setInterval(() => {
        setIndice((p) => (p + 1) % FRASES_BIZARRO.length);
      }, 3000);
    } else {
      setMostrarTexto(false);
    }
    return () => {
      if (loopI) clearInterval(loopI);
    };
  }, [bizarro]);

  // Actualizar Cuadro
  useEffect(() => {
    const cuadro = document.querySelector(".cuadro-texto");
    const texto = document.getElementById("textoMascota");
    if (!cuadro || !texto) return;
    texto.innerText = FR[indice];
    if (mostrarTexto) cuadro.classList.add("active");
    else cuadro.classList.remove("active");
  }, [indice, mostrarTexto, FR]);

  // Vincular clic en mascota
  useEffect(() => {
    const mascotaImg = document.querySelector(".mascota img");
    if (!mascotaImg) return;
    mascotaImg.addEventListener("click", clickMascota);
    return () => {
      mascotaImg.removeEventListener("click", clickMascota);
    };
  }, [bizarro]);

  // Flip loco
  useEffect(() => {
    const cards = document.querySelectorAll(".card-flip");
    cards.forEach((c) => {
      if (bizarro) {
        c.classList.add("bizarro-flip");
      } else {
        c.classList.remove("bizarro-flip");
      }
    });
  }, [bizarro]);

  // Toggles
  const toggleBizarro = () => {
    if (bizarro) {
      // Al desactivar => Pantallazo azul
      const overlay = document.querySelector(".bsod-overlay");
      if (overlay) overlay.classList.add("active"); // Muestra la overlay

      // Esperamos 5s
      setTimeout(() => {
        // Quitamos overlay
        if (overlay) overlay.classList.remove("active");

        // Recién aquí mostramos mensaje final en la mascota
        const cuadro = document.querySelector(".cuadro-texto");
        const texto = document.getElementById("textoMascota");
        if (texto && cuadro) {
          texto.innerText = "Ufff que bueno que alfin termino esa pesadilla";
          cuadro.classList.add("active");
          setTimeout(() => cuadro.classList.remove("active"), 4000);
        }

        // Apagamos bizarro
        setBizarro(false);

      }, 5000);

    } else {
      // Encendemos bizarro
      // Movemos la mascota => .bizarro-move
      const mascota = document.querySelector(".mascota");
      if (mascota) {
        mascota.classList.add("bizarro-move");
      }
      setBizarro(true);
    }
  };

  return (
    <div style={{
      position: "fixed",
      bottom: 20,
      right: 220,
      zIndex: 9999
    }}>
      <button
        className={`btn ${bizarro ? "btn-danger" : "btn-warning"}`}
        onClick={toggleBizarro}
      >
        {bizarro ? "Apagar Modo Bizarro" : "Encender Modo Bizarro"}
      </button>
    </div>
  );
}

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.createRoot(root).render(<App />);
