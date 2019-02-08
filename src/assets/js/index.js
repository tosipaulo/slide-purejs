import '../scss/index.scss';
import Slide from './slide';

const slide = new Slide('.slide', '.slide-wraper');
slide.init();
slide.changeSlide(1);

console.log(slide) 