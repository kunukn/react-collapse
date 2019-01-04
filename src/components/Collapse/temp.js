let l = console.log;
let currentOpen = -1;

let accordion = qs('.accordion');

init(qs('.block--1', accordion), 1);
init(qs('.block--2', accordion), 2);
init(qs('.block--3', accordion), 3);

function init(block, index) {
  let toggle = qs('.toggle', block);
  let text = qs('.text', block);

  function collapsed() {
    text.style.maxHeight = 0 + 'px';
    block.classList.remove('block--active');
    text.style.visibility = 'hidden';
  }
  collapsed();

  toggle.addEventListener('click', onClick.bind({ index }), false);
  text.addEventListener('transitionend', onTransitionEnd, false);

  function onTransitionEnd(event) {
    let target = event.target;
    if (target.style.maxHeight !== '0px') {
      target.style.maxHeight = '';
    } else {
      target.style.visibility = 'hidden';
    }
  }

  function onClick(event) {
    let index = this.index;
    let block = qs('.block--' + index, accordion);
    if (index === currentOpen) {
      collapse(block);
      currentOpen = -1;
    } else {
      let prevBlock = qs('.block--' + currentOpen, accordion);
      prevBlock && collapse(prevBlock);
      expand(block);
      currentOpen = index;
    }
  }
}

function expand(block) {
  let text = qs('.text', block);
  let icon = qs('.icon', block);

  block.classList.add('block--active');
  icon.classList.add('icon--expanded');

  nextFrame(() => {
    text.style.maxHeight = text.scrollHeight + 'px';
    text.style.visibility = '';
  });
}
function collapse(block) {
  let text = qs('.text', block);
  let icon = qs('.icon', block);

  block.classList.remove('block--active');
  icon.classList.remove('icon--expanded');

  text.style.maxHeight = text.scrollHeight + 'px';
  nextFrame(() => {
    text.style.maxHeight = 0 + 'px';
  });
}

function qs(expr, context) {
  return (context || document).querySelector(expr);
}
function qsa(expr, context) {
  return [].slice.call((context || document).querySelectorAll(expr), 0);
}

function rAF(callback) {
  requestAnimationFrame(callback);
}

function nextFrame(callback) {
  rAF(_ => rAF(callback));
}

//function nextFrame(callback) {   rAF( () => setTimeout(callback, 0))}
