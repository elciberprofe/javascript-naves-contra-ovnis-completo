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
// ----------------------- CLASE ESTRELLA ------------------------
// ---------------------------------------------------------------
class Estrella {
  //Método Constructor con propiedades -- PosicionX, PosicionY, AnchoX, AltoY, Velocidad, ElementoHTML
  constructor() {
    this.anchoX = 3;
    this.altoY = 3;
    this.posicionX = Math.floor(Math.random() * (pantallaAncho - this.anchoX));
    this.posicionY = Math.floor(Math.random() * (pantallaAlto - this.altoY));
    this.velocidad = Math.floor(Math.random() * 10) + 2;
    //Creación del elemento HTML y  inicialización de sus propiedades
    this.elementoHTML = document.createElement("div");
    this.elementoHTML.style.left = this.posicionX + "px";
    this.elementoHTML.style.top = this.posicionY + "px";
    this.elementoHTML.style.width = this.anchoX + "px";
    this.elementoHTML.style.height = this.altoY + "px";
    this.elementoHTML.classList.add("estrella");
  }
  //Método Dibujar Estrella
  dibujar() {
    this.elementoHTML.style.left = this.posicionX + "px";
    this.elementoHTML.style.top = this.posicionY + "px";
  }
  //Método Mover Estrella
  mover() {
    this.anchoX = Math.floor(Math.random() * 5) + 2;
    this.altoY = Math.floor(Math.random() * 5) + 2;
    this.posicionX -= this.velocidad;
    if (this.posicionX < -this.anchoX) {
      this.posicionX = pantallaAncho + this.anchoX;
      this.posicionY = Math.floor(Math.random() * (pantallaAlto - this.altoY));
      this.velocidad = Math.floor(Math.random() * 10) + 2;
    }
  }
}

// ---------------------------------------------------------------
// ------------------------ CLASE NAVE ---------------------------
// ---------------------------------------------------------------
class Nave {
  constructor() {
    //Método Constructor con propiedades -- PosicionX, PosicionY, AnchoX, AltoY, Velocidad, Imagen y ElementoHTML
    this.posicionX = 100;
    this.posicionY = 0;
    this.anchoX = 150;
    this.altoY = 75;
    this.velocidad = gravedad;
    this.activa = false;
    this.disparando = false;
    this.imagen = "./naveParada.png";
    //Creación del elemento HTML y  inicialización de sus propiedades
    this.elementoHTML = document.createElement("div");
    this.elementoHTML.style.left = this.posicionX + "px";
    this.elementoHTML.style.top = this.posicionY + "px";
    this.elementoHTML.style.width = this.anchoX + "px";
    this.elementoHTML.style.height = this.altoY + "px";
    this.elementoHTML.classList.add("nave");
  }
  //Método Dibujar Nave
  dibujar() {
    if (this.activa)
      this.elementoHTML.style.background = "url('./naveActiva.png') no-repeat";
    else
      this.elementoHTML.style.background = "url('./naveParada.png') no-repeat";
    this.elementoHTML.style.backgroundSize = "contain";
    this.elementoHTML.style.left = this.posicionX + "px";
    this.elementoHTML.style.top = this.posicionY + "px";
  }
  //Método Mover Nave
  mover() {
    this.posicionY += this.velocidad;
    if (this.posicionY < 0) this.posicionY = 0;
    if (this.posicionY + this.altoY > pantallaAlto)
      this.posicionY = pantallaAlto - this.altoY;
  }
}

// ---------------------------------------------------------------
// ---------------------- CLASE ENEMIGO --------------------------
// ---------------------------------------------------------------
class Enemigo {
  constructor() {
    //Método Constructor con propiedades -- PosicionX, PosicionY, AnchoX, AltoY, Velocidad, Imagen y ElementoHTML
    this.anchoX = 80;
    this.altoY = 50;
    this.posicionX = pantallaAncho + this.anchoX;
    this.posicionY = Math.floor(Math.random() * (pantallaAlto - this.altoY));
    this.velocidad = Math.floor(Math.random() * 5) + 2;
    //Creación del elemento HTML y  inicialización de sus propiedades
    this.elementoHTML = document.createElement("div");
    this.elementoHTML.style.left = this.posicionX + "px";
    this.elementoHTML.style.top = this.posicionY + "px";
    this.elementoHTML.style.width = this.anchoX + "px";
    this.elementoHTML.style.height = this.altoY + "px";
    this.elementoHTML.classList.add("enemigo");
    this.elementoHTML.style.background = "url('./enemigo.png')";
    this.elementoHTML.style.backgroundRepeat = "no-repeat";
    this.elementoHTML.style.backgroundSize = "contain";
  }
  //Método Dibujar Enemigo
  dibujar() {
    this.elementoHTML.style.left = this.posicionX + "px";
    this.elementoHTML.style.top = this.posicionY + "px";
  }
  //Método Mover Enemigo
  mover() {
    this.posicionX -= this.velocidad;
    if (this.posicionX < -this.anchoX) {
      this.posicionX = pantallaAncho + this.anchoX;
      this.posicionY = Math.floor(Math.random() * (pantallaAlto - this.altoY));
      this.velocidad = Math.floor(Math.random() * 5) + 2;
    }
  }
}

// ---------------------------------------------------------------
// --------------------- CLASE PROYECTIL -------------------------
// ---------------------------------------------------------------
class Proyectil {
  constructor() {
    //Método Constructor con propiedades -- PosicionX, PosicionY, AnchoX, AltoY, Velocidad, Imagen, Activo y ElementoHTML
    this.anchoX = 50;
    this.altoY = 25;
    this.posicionX = -100;
    this.posicionY = -100;
    this.velocidad = gravedad;
    this.activo = false;
    //Creación del elemento HTML y  inicialización de sus propiedades
    this.elementoHTML = document.createElement("div");
    this.elementoHTML.style.left = this.posicionX + "px";
    this.elementoHTML.style.top = this.posicionY + "px";
    this.elementoHTML.style.width = this.anchoX + "px";
    this.elementoHTML.style.height = this.altoY + "px";
    this.elementoHTML.classList.add("proyectil");
    this.elementoHTML.style.background = "url('./proyectil.png')";
    this.elementoHTML.style.backgroundRepeat = "no-repeat";
    this.elementoHTML.style.backgroundSize = "contain";
  }
  //Método Dibujar Proyectil
  dibujar() {
    this.elementoHTML.style.left = this.posicionX + "px";
    this.elementoHTML.style.top = this.posicionY + "px";
  }
  //Método Mover Proyectil
  mover() {
    if (this.posicionX > 0) this.posicionX += this.velocidad;
    if (this.posicionX > pantallaAncho) {
      this.posicionX = -100;
      this.posicionY = -100;
      this.activo = false;
    }
  }
}

// ---------------------------------------------------------------
// --------------------- CLASE EXPLOSION -------------------------
// ---------------------------------------------------------------
class Explosion {
  constructor() {
    //Método Constructor con propiedades -- PosicionX, PosicionY, AnchoX, AltoY, Velocidad, Imagen, Activo y ElementoHTML
    this.anchoX = 114;
    this.altoY = 90;
    this.posicionX = -200;
    this.posicionY = -200;
    //Creación del elemento HTML y  inicialización de sus propiedades
    this.elementoHTML = document.createElement("div");
    this.elementoHTML.style.left = this.posicionX + "px";
    this.elementoHTML.style.top = this.posicionY + "px";
    this.elementoHTML.style.width = this.anchoX + "px";
    this.elementoHTML.style.height = this.altoY + "px";
    this.elementoHTML.classList.add("explosion");
    this.elementoHTML.style.background = "url('./explosion.png')";
    this.elementoHTML.style.backgroundRepeat = "no-repeat";
    this.elementoHTML.style.backgroundSize = "contain";
  }
  //Método Dibujar Explosion
  dibujar() {
    this.elementoHTML.style.left = this.posicionX + "px";
    this.elementoHTML.style.top = this.posicionY + "px";
  }
  //Método Reiniciar Explosion
  reiniciar() {
    this.posicionX = -200;
    this.posicionY = -200;
  }
}
