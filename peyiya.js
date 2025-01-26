// Arreglo de frases divertidas
const frases = [
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

// Seleccionar elementos
const mascota = document.querySelector('.mascota img');
const cuadroTexto = document.querySelector('.cuadro-texto');
const textoMascota = document.getElementById('textoMascota');

// Variable para controlar la frase actual
let indiceFrase = 0;

// Función para mostrar la siguiente frase
function mostrarFrase() {
  textoMascota.innerText = frases[indiceFrase];
  cuadroTexto.classList.add('active');
  indiceFrase = (indiceFrase + 1) % frases.length;
  
  // Ocultar el cuadro después de 3 segundos
  setTimeout(() => {
      cuadroTexto.classList.remove('active');
  }, 3000);
}

// Añadir evento de clic a la mascota
mascota.addEventListener('click', mostrarFrase);

// Actualizar el título de forma correcta (si es necesario)
document.getElementById("tituloTexto").innerHTML = "Y a m b o";
