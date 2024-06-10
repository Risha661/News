const preload = {
  circle: `<svg width="180" height="180" fill="none" src="image/preload.svg">`,
  overlay: document.createElement('div'),

  show() {
    this.overlay.classList.add('preload');
    this.overlay.innerHTML = this.circle;
    document.body.append(this.overlay);
  },
  remove() {
    this.overlay.remove();
  },
};
