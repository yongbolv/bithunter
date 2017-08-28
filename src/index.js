/* global ga, mixpanel */
/**
 * index.js
 */
import qs from 'query-string';

if (typeof console === 'object') {
    console.log('\n' +
        '  |\\      _,,,,--,,_       \n' +
        '  /,`.-\'`\'    -,  \\-;,   \n' +
        ' |,4-  ) ),,__ ,\\ (  ;;    [t] tandem.ly\n' +
        ' ---\'\'(.\'--\'  `-\'`.)`  \n' +
        '\n' +
        'Hey there!  We\'re glad you\'re curious about our code.\n' +
        'We\'d love to chat with you about what you\'re working on\n' +
        'and see how you could help us improve!\n' +
        '                                      -- hireme@tandem.ly\n' +
        '\n'
    );
}
var toggle = document.querySelector('.header__nav-button');
var nav = document.querySelector('nav.global-nav');
const header = document.querySelector('#header');
const hero = document.querySelector('.hero .container_full') || document.querySelector('.section.first .container_full');
const hero_button = hero && hero.querySelector('.cta .button');
const input = document.querySelector('.hireus-form-container input[name="name"]');

if (hero_button) {
    hero_button.addEventListener('click', (ev) => {
        input && input.focus();
        ev.preventDefault();
    })
}



toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  nav.classList.toggle('open');
  header.classList.toggle('open');
});

const form = document.querySelector('form[name="hireus"]');
const connect_endpoint = "https://calendly.com/tandemly-core-team/discovery-chat";
const nav_cta = document.querySelector('header nav li.cta a');

const connect = (name, email) => {
    const params = qs.stringify({ name, email });
    const url = [connect_endpoint, '?', params].join('');
    galink(url, 'CTA Form Click', 'cta-form-click');
    mixpanel.track('cta form click');
}

const galink = (url, eventName, label) => {
    ga('send', 'event', eventName, 'click', {
        hitCallback: () => {
            window.location.href = url;
        }
    });
}

if (nav_cta) {
    nav_cta.addEventListener('click', (ev) => {
        ev.preventDefault();
        galink(ev.target.href, 'CTA Nav Click', 'cta-nav-click')
        mixpanel.track('cta click');
    });
}

if (form) {
    console.log('connecting form', form);
    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const name = form.querySelector('input[name="name"]').value;
        const email = form.querySelector('input[name="email"]').value;
        connect(name, email);
    });
}

// const pos = hero.getBoundingClientRect().bottom;
const pos = (hero && hero.offsetHeight) || 150;
const scroll = window.requestAnimationFrame;

const loop = () => {
    if (window.pageYOffset >= pos) { // && /slide-up/.test(fixed_cta.className)) {
        header.classList.add('affixed');
    }
    if (window.pageYOffset < pos ) { // && /slide-down/.test(fixed_cta.className)) {
        header.classList.remove('affixed');
    }
    scroll(loop);
}

loop();


window.addEventListener('load', () => {
    mixpanel.track('page view', {
        'page name' : document.title,
        'url' : window.location.pathname
    });
});
