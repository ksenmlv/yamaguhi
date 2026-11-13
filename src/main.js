
import './style.css';
import Swiper from 'swiper';
import { EffectCreative, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';

import imgPhen from './assets/slide1__img-phen.svg';
import imgStyler from './assets/slide1__img-styler.svg';
import imgHair from './assets/slide1__img-hair.svg';
import imgSlide2 from './assets/img_slide2.svg';
import imgSlide3 from './assets/img_slide3.svg';
import mobileHairdryer from './assets/mobile-hairdryer.svg';
import mobileStyler from './assets/mobile-styler.svg';
import mobileMotor from './assets/mobile-motor.svg';
import mobilePeroIcon from './assets/mobile-pero.svg';
import mobileMotorIcon from './assets/mobile-motor2.svg';
import starImage from './assets/star.svg';
import wheelArcImage from './assets/ellipse.svg';
import hairdryerIcon from './assets/hairdryer.svg';
import hairdryerActiveIcon from './assets/hairdryer-active.svg';
import peroIcon from './assets/pero.svg';
import peroActiveIcon from './assets/pero-active.svg';
import motorIcon from './assets/motor.svg';
import motorActiveIcon from './assets/motor-active.svg';

// Подключение изображений первого слайда
document.documentElement.style.setProperty(
  '--img-phen',
  `url("${imgPhen}")`
);

document.documentElement.style.setProperty(
  '--img-styler',
  `url("${imgStyler}")`
);

document.documentElement.style.setProperty(
  '--img-hair',
  `url("${imgHair}")`
);
document.documentElement.style.setProperty(
  '--img-slide2',
  `url("${imgSlide2}")`
);
document.documentElement.style.setProperty(
  '--img-slide3',
  `url("${imgSlide3}")`
);
document.documentElement.style.setProperty(
  '--img-mobile-hairdryer',
  `url("${mobileHairdryer}")`
);
document.documentElement.style.setProperty(
  '--img-mobile-styler',
  `url("${mobileStyler}")`
);
document.documentElement.style.setProperty(
  '--img-mobile-motor',
  `url("${mobileMotor}")`
);
const mobileMotorImage = document.querySelector('.slide3__motor-image');
if (mobileMotorImage) mobileMotorImage.src = mobileMotor;
document.documentElement.style.setProperty(
  '--img-mobile-pero-icon',
  `url("${mobilePeroIcon}")`
);
document.documentElement.style.setProperty(
  '--img-mobile-motor-icon',
  `url("${mobileMotorIcon}")`
);
document.documentElement.style.setProperty(
  '--star-image',
  `url("${starImage}")`
);
document.documentElement.style.setProperty(
  '--pero-active-image',
  `url("${peroActiveIcon}")`
);
document.documentElement.style.setProperty(
  '--motor-active-image',
  `url("${motorActiveIcon}")`
);

// Боковая навигация и десктопный слайдер
const wheelIcons = document.querySelectorAll('.wheel-icon');
const desktopQuery = window.matchMedia('(min-width: 769px)');
const wheelArtwork = {
  arc: wheelArcImage,
  icons: [
    { active: hairdryerActiveIcon, inactive: hairdryerIcon },
    { active: peroActiveIcon, inactive: peroIcon },
    { active: motorActiveIcon, inactive: motorIcon },
  ],
};
const wheelArc = document.querySelector('.wheel-arc');
let swiper;

if (wheelArtwork.arc && wheelArc) {
  wheelArc.src = wheelArtwork.arc;
  wheelArc.closest('.side-wheel')?.classList.add('has-wheel-art');
}

function updateWheel(activeIndex) {
  wheelIcons.forEach((icon, index) => {
    let offset = (index - activeIndex + wheelIcons.length) % wheelIcons.length;
    if (offset > wheelIcons.length / 2) offset -= wheelIcons.length;

    const active = index === activeIndex;
    const image = icon.querySelector('.wheel-icon__image');
    const artwork = wheelArtwork.icons[index];
    const imageUrl = active ? artwork?.active : artwork?.inactive;

    icon.classList.toggle('active', active);
    icon.classList.toggle('has-art', Boolean(imageUrl));
    if (image && imageUrl && image.getAttribute('src') !== imageUrl) {
      image.src = imageUrl;
    } else if (image && !imageUrl) {
      image.removeAttribute('src');
    }
    icon.style.setProperty('--wheel-offset-y', `${offset * 72}px`);
  });
}

function enableDesktopSlider() {
  if (!desktopQuery.matches || swiper) return;

  swiper = new Swiper('.main-slider', {
    modules: [EffectCreative, Mousewheel],
    direction: 'vertical',
    speed: 850,
    effect: 'creative',
    creativeEffect: {
      prev: { translate: [0, '-100%', 0], opacity: 0 },
      next: { translate: [0, '100%', 0], opacity: 0 },
    },
    mousewheel: {
      forceToAxis: true,
      thresholdDelta: 20,
      thresholdTime: 500,
    },
    on: {
      slideChange() {
        updateWheel(this.activeIndex);
      },
    },
  });
  updateWheel(swiper.activeIndex);
}

wheelIcons.forEach((icon) => {
  icon.addEventListener('click', () => {
    if (desktopQuery.matches) swiper?.slideTo(Number(icon.dataset.slide));
  });
});

desktopQuery.addEventListener('change', (event) => {
  if (event.matches) {
    enableDesktopSlider();
  } else if (swiper) {
    swiper.destroy(true, true);
    swiper = undefined;
  }
});

enableDesktopSlider();
