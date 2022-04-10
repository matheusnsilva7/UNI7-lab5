/*3.1: Crie uma função para verificar se um valor é Verdadeiro,
se for verdadeiro adicione no console e verdadeiro.*/

const verificar = function(valor){
    return valor ? true : false;
}
console.log(verificar(true));

/*3.2: Crie uma função matemática que retorne o perímetro de um quadrado.
lembrando: perímetro é a soma dos quatro lados do quadrado.*/

const perimetroDoQuadrado = function(lado1,lado2,lado3,lado4){
    const array = [lado1,lado2,lado3,lado4];
    return array.reduce((a,b) => a + b,0);
}
console.log(perimetroDoQuadrado(10,10,15,15));

/*3.3 Crie uma função que retorne o seu nome completo
ela deve possuir os parâmetros: nome e sobrenome*/

const nomeCompleto = function(nome,sobrenome){
    return `Meu nome é ${nome} ${sobrenome}`;
}
console.log(nomeCompleto('Matheus','Silva'))

/*3.4 Crie uma função que verifica se um número é par,
escrever no console se o número par ou ímpar.*/

const verificaNumeroPar = function(num){
    return num % 2 === 0 ? 'par' : 'ímpar'
}
console.log(verificaNumeroPar(1))

/*3.5 Crie uma função que retorne o tipo de
dado do argumento passado nela (typeof).*/

function tipoArgumento(valor){
    return typeof valor
}
console.log(tipoArgumento(true))
