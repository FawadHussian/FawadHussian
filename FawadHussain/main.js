// MOBILE MENU TOGGLE
const mobileToggle = document.querySelector('.mobile-nav-toggle');
const primaryNav = document.querySelector('.primary-nav');

mobileToggle.addEventListener('click', () => {
    const visibilty = mobileToggle.getAttribute('aria-expanded');
    if ( visibilty === 'false') {
        primaryNav.setAttribute('aria-hidden', false);
        mobileToggle.setAttribute('aria-expanded', true);
    } else {
        primaryNav.setAttribute('aria-hidden', true);
        mobileToggle.setAttribute('aria-expanded', false);
      }
})

// Cursor Animation
// const cursor = document.querySelector('.cursor');
// var timeout;

// addEventListener('mousemove', (e) => {
//   let x = e.pageX;
//   let y = e.pageY;

//   cursor.style.top = y + "px"
//   cursor.style.left = x + "px"
//   cursor.style.display = 'block';

//   // cursor effects when mouse is stopped
//   function mouseStopped() {
//     cursor.style.display = 'none'
//   }
//   clearTimeout(timeout)
//   timeout = setTimeout(mouseStopped, 1000);
// })

// // cursor effects when mouseout
// addEventListener('mouseout', () => {
//   cursor.style.display ='none';
// })