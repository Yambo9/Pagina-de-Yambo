const { useState, useEffect } = React;

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

  // Si había instancia previa, la descartamos
  const prev = bootstrap.Carousel.getInstance(crazyCarousel);
  if (prev) {
    prev.dispose();
  }
  // Creamos nueva instancia
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

  // Iniciamos carrusel normal a 5000
  useEffect(() => {
    initCarousel(5000);
  }, []);

  // Observamos bizarro => definimos scroller triple de rapido => ~33 ms
  useEffect(() => {
    let colorInterval = null;
    // Mascota
    const mascota = document.querySelector(".mascota");

    if (bizarro) {
      document.body.classList.add("bizarro-active");
      colorInterval = setInterval(() => {
        document.body.style.backgroundColor =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
      }, 300);
      // triple de rapido => 100ms => 33
      initCarousel(33);

      // Mascota se mueve
      if (mascota) {
        mascota.classList.add("bizarro-move");
      }
    } else {
      document.body.classList.remove("bizarro-active");
      document.body.style.backgroundColor = "";
      initCarousel(5000);
      if (mascota) {
        mascota.classList.remove("bizarro-move");
      }
    }

    return () => {
      clearInterval(colorInterval);
    };
  }, [bizarro]);

  const FR = bizarro ? FRASES_BIZARRO : FRASES_NORMALES;

  // Mascota clic => normal
  const clickMascota = () => {
    if (bizarro) return;
    setMostrarTexto(true);
    setIndice((prev) => (prev + 1) % FR.length);
    setTimeout(() => {
      setMostrarTexto(false);
    }, 3000);
  };

  // Bizarro => loop
  useEffect(() => {
    let loopInt = null;
    if (bizarro) {
      setMostrarTexto(true);
      loopInt = setInterval(() => {
        setIndice((prev) => (prev + 1) % FRASES_BIZARRO.length);
      }, 3000);
    } else {
      setMostrarTexto(false);
    }
    return () => {
      if (loopInt) clearInterval(loopInt);
    };
  }, [bizarro]);

  // Actualizar cuadro
  useEffect(() => {
    const cuadro = document.querySelector(".cuadro-texto");
    const texto = document.getElementById("textoMascota");
    if (!cuadro || !texto) return;
    texto.innerText = FR[indice];
    if (mostrarTexto) cuadro.classList.add("active");
    else cuadro.classList.remove("active");
  }, [indice, mostrarTexto, FR]);

  // Vincular click
  useEffect(() => {
    const mascotaImg = document.querySelector(".mascota img");
    if (!mascotaImg) return;
    mascotaImg.addEventListener("click", clickMascota);
    return () => {
      mascotaImg.removeEventListener("click", clickMascota);
    };
  }, [bizarro]);

  // Flip loco en cards
  useEffect(() => {
    const cards = document.querySelectorAll(".card-flip");
    cards.forEach((card) => {
      if (bizarro) {
        card.classList.add("bizarro-flip");
      } else {
        card.classList.remove("bizarro-flip");
      }
    });
  }, [bizarro]);

  const toggleBizarro = () => {
    if (bizarro) {
      // Mensaje final
      const texto = document.getElementById("textoMascota");
      const cuadro = document.querySelector(".cuadro-texto");
      if (texto && cuadro) {
        texto.innerText = "Ohhh que bueno que termino";
        cuadro.classList.add("active");
        setTimeout(() => cuadro.classList.remove("active"), 3000);
      }
    }
    setBizarro(!bizarro);
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

const rootDiv = document.createElement("div");
document.body.appendChild(rootDiv);
ReactDOM.createRoot(rootDiv).render(<App />);
