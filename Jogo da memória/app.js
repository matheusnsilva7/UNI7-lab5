class jogoMemoria{
    constructor(tempo,cartas){
        this.cartaArray = cartas;
        this.tempoTotal = tempo;
        this.tempoRestante = tempo;
        this.tempo= document.getElementById('tempo-restante');
        this.jogadas= document.getElementById("jogadas");
    }
    começar(){
        this.verificar= null;
        this.totalClicks=0;
        this.tempoRestante= this.tempoTotal;
        this.cartasCombinadas = [];
        this.ativo=true;
        setTimeout(()=>{
            this.contagemRegressiva = this.começarContagemRegressiva();
            this.baralharCartas();
            this.ativo=false;
        },300)
        this.esconder();
        this.tempo.innerText= this.tempoRestante;
        this.jogadas.innerText= this.totalClicks;
    }
    esconder(){
        this.cartaArray.forEach(carta=> {
            carta.classList.remove("visivel");
        });
    }
    virarCarta(carta){
        if (this.podeVirarCarta(carta)){
            this.totalClicks++;
            this.jogadas.innerText= this.totalClicks;
            carta.classList.add("visivel");
        }
        if(this.verificar){
            this.verificarCarta(carta);
        }else{
            this.verificar=carta
        }
    }
    verificarCarta(carta){
        if(this.obterTipoCarta(carta) === this.obterTipoCarta(this.verificar)){
            this.acertou(carta, this.verificar)
        }else{
            this.errou(carta, this.verificar)
        }
        this.verificar=null;
    }
    acertou(carta1 , carta2){
        this.cartasCombinadas.push(carta1);
        this.cartasCombinadas.push(carta2);
        if(this.cartasCombinadas.length === this.cartaArray.length){
            this.vitoria()
        }
    }
    errou(carta1,carta2){
        this.ativo=true;
        setTimeout(()=>{
            carta1.classList.remove('visivel');
            carta2.classList.remove('visivel');
            this.ativo=false
        },500)
    }
    obterTipoCarta(carta){
        return Array.from(carta.classList)[2];
    }
    começarContagemRegressiva(){
        return setInterval(()=>{
            this.tempoRestante--;
            this.tempo.innerText= this.tempoRestante;
            if(this.tempoRestante === 0) {
                this.gameover()
            }
        }, 1000)
    }
    vitoria(){
        clearInterval(this.contagemRegressiva);
        document.getElementById('vitoria').classList.add("aparecer")
    }
    gameover(){
        clearInterval(this.contagemRegressiva);
        document.getElementById('game-over').classList.add("aparecer");
    }
    baralharCartas(){
        for(let i=this.cartaArray.length -1 ; i>0 ; i--){
            let aleatório = Math.floor(Math.random() * (i+1));
            this.cartaArray[aleatório].style.order = i;
            this.cartaArray[i].style.order = aleatório;
        }
    }
    podeVirarCarta(carta){
        return !this.ativo && !this.cartasCombinadas.includes(carta) && carta !== this.verificar;
    }
}
let sobreposicao = Array.from(document.getElementsByClassName('texto-sobreposicao'));
let cartas = Array.from(document.getElementsByClassName('carta'))
let jogo = new jogoMemoria(30,cartas);

sobreposicao.forEach(a =>{
    a.addEventListener("click",()=>{
        a.classList.remove('aparecer');
        jogo.começar();
    });
});
cartas.forEach(b =>{
    b.addEventListener("click",()=>{
        jogo.virarCarta(b);
    });
});