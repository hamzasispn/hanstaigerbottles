import Alpine from 'alpinejs';
import './gsap-animations.js';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './tailwind.css';
import './main.scss';

window.Alpine = Alpine;
window.Swiper = Swiper;
window.Navigation = Navigation;
window.Pagination = Pagination;

Alpine.start();