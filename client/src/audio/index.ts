import galibri from './Galibri & Mavik - Федерико Феллини.mp3';
import dead from './Dead Blonde - Бесприданница.mp3';
import dabro from './DaBro - На Часах Ноль-Ноль.mp3';
import nlo from './NLO - Не Грусти.mp3';
import coca from './Клава Кока & Руки Вверх - Нокаут.mp3';
import img1 from '../img/adventure-lettering-with-photo_23-2148158581.jpg';
import { IApp } from '../App.interface';
import defaultImg from '../img/defaultImg.png';

export const musics: IApp = [
  {
    title: 'Galibri',
    audio: galibri,
    artist: 'Federico',
    img: img1,
    color: '#f2a0f27c',
  },
  {
    title: 'Dabro',
    audio: dabro,
    artist: 'Federico',
    img: defaultImg,
    color: 'red',
  },
  {
    title: 'Dead',
    audio: dead,
    artist: 'Federico',
    img: defaultImg,
    color: 'blue',
  },
  {
    title: 'Nlo',
    audio: nlo,
    artist: 'Federico',
    img: defaultImg,
    color: 'pink',
  },
  {
    title: 'Coca',
    audio: coca,
    artist: 'Federico',
    img: defaultImg,
    color: 'black',
  },
];
