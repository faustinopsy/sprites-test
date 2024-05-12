import { Kyo } from './Kyo.js';
import { Inimigo } from './Inimigo.js';
import { Cenario } from './Cenario.js';
import { Menu } from './Menu.js';
import { init } from './loading.js';


const mainContainer = document.querySelector('#main-container');
const menu = new Menu(mainContainer);
const kyoElemento = document.querySelector('.kyo');
const inimigoElemento = document.querySelector('.inimigo');
const cenarioElemento = document.querySelector('.cenario');
const kyo = new Kyo(kyoElemento);
window.myKyo = kyo;
const inimigo = new Inimigo(inimigoElemento);
const cenario = new Cenario(cenarioElemento);

let intervaloAtual = null;
let intervaloAtualcenario= null;
let string='';

init();
menu.init();
const tempoBase = 200;
document.addEventListener('keypress', (event) => {
    clearInterval(intervaloAtual); 
    clearInterval(intervaloAtualcenario);

    let intervaloTempo = tempoBase / window.myKyo.velocidadeVertical;
    switch (event.key) {
        case 'w':
            intervaloAtual = setInterval(() => kyo.pular(intervaloAtual), 200); 
            break;
        case 'a':
            intervaloAtual = setInterval(() => kyo.correr(), tempoBase);
            intervaloAtualcenario = setInterval(() => cenario.atualizaCenario(kyo.posicaoX), tempoBase);
            break;
        case 'd':
            kyo.parar(intervaloAtual); 
            cenario.pararCenario(intervaloAtualcenario);
            break;
        case 's':
            intervaloAtual = setInterval(() => kyo.darSoco(intervaloAtual), tempoBase); 
            verificaColisao(true);
            break;
            case 'x':
            intervaloAtual = setInterval(() => kyo.especialinicio(intervaloAtual), tempoBase);
            verificaColisao(true);
            break;
        default:
            intervaloAtual = setInterval(() => kyo.correr(), tempoBase);
            break;
    }
});

  document.addEventListener ('keyup', (event) => {
    string +=event.key
    console.log(string)
    if(string.length >= 9){
      switch(string){
        case 'dev-Enter':
          kyo.parar(intervaloAtual)
          menu.init()
        break;
        case 'zero-Enter':
          init()
        break;
        case 'ArrowRight' :
          virarDireita()
        break;
        case 'ArrowLeft' :
          virarEsquerda()
        break;
      }
      string=''
    }
    function virarDireita(){
        kyo.kyo.classList.add('virar')
        cenario.posicao=1
        kyo.direcaoPulo=-1
      }
      function virarEsquerda(){
        kyo.kyo.classList.remove('virar')
        cenario.posicao=2
        kyo.direcaoPulo=1
      }
  });
function verificaColisao(soco = false) {
    let kyoRect = kyo.kyo.getBoundingClientRect();
    let inimigoRect = inimigo.inimigo.getBoundingClientRect();
    // console.log(kyoRect)
    // console.log(inimigoRect)
    const tolerancia = 1;
    if (kyoRect.right > inimigoRect.left + tolerancia &&
        kyoRect.left < inimigoRect.right - tolerancia &&
        kyoRect.bottom > inimigoRect.top + tolerancia &&
        kyoRect.top < inimigoRect.bottom - tolerancia) {
        if (soco) {
            console.log('Kyo acertou o soco no inimigo!');
            inimigoElemento.style.backgroundColor = 'red';
            setTimeout(() => inimigo.destruirInimigo(), 500);
        }
    }
}

setInterval(() => {
    kyo.atualizaPosicao();
    
}, 50);

setInterval(() => {
    inimigo.chamaInimigo();
}, Math.random() * (5000 - 2000) + 2000);

