/*
Título: Juego Naves contra Ovnis (Completo).
Nivel Educativo: Ciclo Formativo de Grado Superior
Curso: DAM, DAW o ASIR
Conocimientos del alumnado I: Tipos de Datos, Constantes y Variables 
Conocimientos del alumnado II: Operaciones Aritméticas, Lógicas y Relacionales
Conocomientos del alumnado III: Instrucciones de Control Condicional
Conocomientos del alumnado IV: Instrucciones de Control Iterativa
Conocomientos del alumnado V: Estructuras de datos (Vectores)
Conocomientos del alumnado VI: Funciones y Procedimientos
Conocomientos del alumnado VII: Estructuras de datos (Objeto básico)
Conocomientos del alumnado VIII: Estrcutrua lógica de un videojuego web
Conocomientos del alumnado IX: Animaciones 2D básicas
Conocimientos del alumnado X: Programación orientada a objetos (esquema de clases) 
Fecha: 07 / 06 / 2023
Autor: Xavi Garcia (ElCiberProfe)
Web: https://www.elciberprofe.com
Lenguaje: JavaScript
*/

// ---------------------------------------------------------------
// -------------------- Variables de Pantalla --------------------
// ---------------------------------------------------------------
const pantalla = document.querySelector("#pantalla");
const pantallaAncho = window.innerWidth;
const pantallaAlto = window.innerHeight;
const fotogramas = 1000 / 60;
const puntuacion = document.querySelector(".puntuacion");

// ---------------------------------------------------------------
// ------------------ Variables de la Partida --------------------
// ---------------------------------------------------------------
const vectorEstrellas = [];
const maxEstrellas = 200;
const vectorEnemigos = [];
const maxEnemigos = 16;
const vectorProyectiles = [];
const maxProyectiles = 8;
const gravedad = 5;
let puntos = 0;
let derribos = 0;
let vidas = 3;

// ------------------ VECTOR OBJETOS ESTRELLA --------------------
for (let i = 0; i < maxEstrellas; i++) {
  vectorEstrellas.push(new Estrella());
  pantalla.appendChild(vectorEstrellas[i].elementoHTML);
}

// ------------------------ OBJETO NAVE --------------------------
const nave = new Nave();
pantalla.appendChild(nave.elementoHTML);

// ------------------ VECTOR OBJETOS ENEMIGO ---------------------
for (let i = 0; i < maxEnemigos; i++) {
  vectorEnemigos.push(new Enemigo());
  pantalla.appendChild(vectorEnemigos[i].elementoHTML);
}

// ----------------- VECTOR OBJETOS PROYECTIL --------------------
for (let i = 0; i < maxProyectiles; i++) {
  vectorProyectiles.push(new Proyectil());
  pantalla.appendChild(vectorProyectiles[i].elementoHTML);
}

// --------------------- OBJETO EXPLOSION ------------------------
const explosion = new Explosion();
pantalla.appendChild(explosion.elementoHTML);

// ------------------- PUNTUACIÓN Y VIDAS ------------------------
const elementoPuntos = document.createElement("p");
const elementoDerribos = document.createElement("p");
const elementoVidas = document.createElement("p");
elementoPuntos.innerHTML = `Puntos: ${puntos}`;
puntuacion.appendChild(elementoPuntos);
elementoDerribos.innerHTML = `Kills: ${derribos}`;
puntuacion.appendChild(elementoDerribos);
elementoVidas.innerHTML = `Vidas: ${vidas}`;
puntuacion.appendChild(elementoVidas);

// ---------------------------------------------------------------
// -------------------- EVENTOS DE TECLADO -----------------------
// ---------------------------------------------------------------
//Control de la nave cuando el usuario presiona una tecla
addEventListener("keydown", (evento) => {
  switch (evento.key) {
    case "ArrowUp":
      nave.velocidad = -gravedad;
      nave.activa = true;
      break;
    case " ":
      if (nave.disparando == false) {
        for (let i = 0; i < maxProyectiles; i++) {
          if (vectorProyectiles[i].activo === false) {
            vectorProyectiles[i].activo = true;
            break;
          }
        }
      }
      nave.disparando = true;
      break;
    default:
      break;
  }
});
//Control de la nave cuando el usuario deja de presionar una tecla
addEventListener("keyup", (evento) => {
  switch (evento.key) {
    case "ArrowUp":
      nave.velocidad = gravedad;
      nave.activa = false;
      break;
    case " ":
      nave.disparando = false;
      break;
    default:
      break;
  }
});

// ---------------------------------------------------------------
// ---------------- COMROBACIÓN DE COLISIONES --------------------
// ---------------------------------------------------------------
function comprobarColisiones() {
  vectorEnemigos.forEach((enemigo) => {
    vectorProyectiles.forEach((proyectil) => {
      //Por cada enemigo y proyectil comprobar si existe superposición
      if (
        proyectil.posicionX <= enemigo.posicionX + enemigo.anchoX &&
        proyectil.posicionX + proyectil.anchoX >= enemigo.posicionX &&
        proyectil.posicionY <= enemigo.posicionY + enemigo.altoY &&
        proyectil.posicionY + proyectil.altoY >= enemigo.posicionY
      ) {
        //Mostrar la explosión y enviar al enemigo y el proyectil fuera de pantalla.
        explosion.posicionX = enemigo.posicionX;
        explosion.posicionY = enemigo.posicionY;
        enemigo.posicionX = -enemigo.anchoX;
        proyectil.posicionX = pantallaAncho;
        proyectil.activo = false;
        puntos += 50;
        elementoPuntos.innerHTML = `Puntos: ${puntos}`;
        derribos++;
        elementoDerribos.innerHTML = `Kills: ${derribos}`;
      }
    });
    //Por cada enemigo y jugador comprobar si existe superposición
    if (
      nave.posicionX <= enemigo.posicionX + enemigo.anchoX &&
      nave.posicionX + nave.anchoX >= enemigo.posicionX &&
      nave.posicionY <= enemigo.posicionY + enemigo.altoY &&
      nave.posicionY + nave.altoY >= enemigo.posicionY
    ) {
      if (vidas > 0) {
        enemigo.posicionX = -enemigo.anchoX;
        vidas--;
        elementoVidas.innerHTML = `Vidas: ${vidas}`;
        puntos -= 50;
        elementoPuntos.innerHTML = `Puntos: ${puntos}`;
      } else {
        //Reiniciar el juego
        enemigo.posicionX = -enemigo.anchoX;
        enemigo.velocidad = 0;
        nave.velocidad = 0;
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    }
  });
}

// ---------------------------------------------------------------
// ---------------- BUCLE ANIMACIÓN VIDEOJUEGO -------------------
// ---------------------------------------------------------------
setInterval(() => {
  //0. Comprobar colisiones
  comprobarColisiones();
  //1. Gestión de las estrellas
  vectorEstrellas.forEach((estrella) => {
    estrella.dibujar();
    estrella.mover();
  });
  //2. Gestión del jugador
  nave.dibujar();
  nave.mover();
  //3. Gestión de los enemigos
  vectorEnemigos.forEach((enemigo) => {
    if (enemigo.posicionX < nave.posicionX) {
      puntos -= 1;
      elementoPuntos.innerHTML = `Puntos: ${puntos}`;
    }
    enemigo.dibujar();
    enemigo.mover();
  });
  //4. Gestión de los proyectiles
  vectorProyectiles.forEach((proyectil) => {
    if (proyectil.activo && proyectil.posicionX < 0) {
      proyectil.posicionX = nave.posicionX + nave.anchoX;
      proyectil.posicionY = nave.posicionY + nave.altoY / 4 + 5;
    }
    proyectil.dibujar();
    proyectil.mover();
  });
  //5. Gestión de las explosiones
  if (explosion.posicionX > 0) {
    explosion.dibujar();
    setTimeout(() => {
      explosion.reiniciar();
      explosion.dibujar();
    }, 200);
  }
}, fotogramas);
