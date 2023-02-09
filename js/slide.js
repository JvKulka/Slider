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
    event.preventDefault();
    this.dist.startX = event.clientX;
    this.container.addEventListener("mousemove", this.onMove);
  }

  // "Quando move"
  onMove(event) {
    const finalPosition = this.updatePosition(event.clientX);
    this.moveSlide(finalPosition);
  }

  // "Quando finaliza"
  onEnd(event) {
    this.container.removeEventListener("mousemove", this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
  }

  // Adiciona os eventos ao slide
  addSlideEvents() {
    this.container.addEventListener("mousedown", this.onStart);
    this.container.addEventListener("mouseup", this.onEnd);
  }

  // Adiciona todas as binds dos eventos
  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  // Inicia os eventos
  init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}
