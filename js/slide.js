export default class Slide {
  constructor(slide, container) {
    this.slide = document.querySelector(slide);
    this.container = document.querySelector(container);
    // Seleciona algumas opções de distancia
    this.dist = { finalPosition: 0, startX: 0, movement: 0 };
  }

  moveSlide(distX) {
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.5;
    return this.dist.finalPosition - this.dist.movement;
  }

  // "Quando inicia"
  onStart(event) {
    let moveType;
    if (event.type === "mousedown") {
      event.preventDefault();
      this.dist.startX = event.clientX;
      moveType = "mousemove";
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      moveType = "touchmove";
    }
    this.container.addEventListener(moveType, this.onMove);
  }

  // "Quando move"
  onMove(event) {
    const pointerPosition =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  // "Quando finaliza"
  onEnd(event) {
    const moveType = event.type === "mouseup" ? "mousemove" : "touchmove";
    this.container.removeEventListener(moveType, this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
  }

  // Adiciona os eventos ao slide
  addSlideEvents() {
    this.container.addEventListener("mousedown", this.onStart);
    this.container.addEventListener("touchstart", this.onStart);
    this.container.addEventListener("mouseup", this.onEnd);
    this.container.addEventListener("touchend", this.onEnd);
  }

  // Adiciona todas as binds dos eventos
  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  // Slides Config
  // Retorna o valor da imagem já centralizada de forma responsiva
  slidePosition() {
    const margin = this.container.offsetWidth - slide.offsetWidth / 2;
    return -(slide.offsetLeft - margin);
  }

  slidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return { position, element };
    });
  }

  slidesIndexNev(index) {
    const last = this.slideArray.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    };
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(this.slideArray[index].position);
    this.slidesIndexNev(index);
    this.dist.finalPosition = activeSlide.position;
  }

  // Inicia os eventos
  init() {
    this.bindEvents();
    this.addSlideEvents();
    this.slidesConfig();
    return this;
  }
}
