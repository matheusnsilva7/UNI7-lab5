'use strict';

const conta1 = {
    proprietário: 'Maria Santos',
    movimentos: [150, 400, -100, 2500, -750, -230, 40, 1000],
    senha: 1111,
};
  
const conta2 = {
    proprietário: 'Miguel Silva',
    movimentos: [3000, 3500, -130, -280, -2340, -1400, 3700, -40],
    senha: 2222,
};
  
const conta3 = {
    proprietário: 'Alice Oliveira',
    movimentos: [350, -130, 300, -350, -120, 350, 70, -300],
    senha: 3333,
};
  
const conta4 = {
    proprietário: 'Theo Souza',
    movimentos: [250, 1500, 300, 510, 50],
    senha: 4444,
};
  
const contas = [conta1, conta2, conta3, conta4];

const benVindo = document.querySelector('.bemVindo');
const saldo = document.querySelector('span');
const conta = document.querySelector('.conta');
const menuPrincipal = document.querySelector('.menuPrincipal')
const movimentos = document.querySelector('.movimentos');
const btnUsuario = document.querySelector('.btnUsuario');
const btnTransferir = document.querySelector('.btnTransferir');
const btnEmprestimo = document.querySelector('.btnEmprestimo');
const btnfechar = document.querySelector('.btnFechar');
const inputUsuario = document.querySelector('.inputUsuario');
const inputSenha = document.querySelector('.inputSenha');
const inputTransferir = document.querySelector('.inputTransferir');
const inputValor = document.querySelector('.inputValor');
const inputEmprestimo = document.querySelector('.inputEmprestimo');

const movimentaçoes = function(mov){
    movimentos.innerHTML = '';

    mov.forEach(function(mov,i){
        const tipo = mov > 0 ? 'depositou' : 'retirou';
        const html = `
        <div class="movimentosLinha ${tipo}">
            <div class="movimentosNumero">${i + 1} ${tipo}</div>
            <div class="movimentosValor">R$${mov}</div>
        </div>
        `;
    movimentos.insertAdjacentHTML('afterbegin',html);
    });
};
movimentaçoes(conta1.movimentos)

const saldoTotal = function(conta){
    conta.saldo = conta.movimentos.reduce((a,b)=> a + b,0);
    saldo.textContent = `R$${conta.saldo}`
}
saldoTotal(conta1)
let contaAtual ;
btnUsuario.addEventListener('click',function(e){
    e.preventDefault()
    contaAtual = contas.find(con => con.proprietário.toLowerCase() === String(inputUsuario.value).toLowerCase());
    
  if(contaAtual?.senha === Number(inputSenha.value)){
    benVindo.textContent = `Bem Vindo, ${contaAtual.proprietário.split(' ')[0]}`;
    movimentaçoes(contaAtual.movimentos);
    saldoTotal(contaAtual)
    menuPrincipal.classList.add('fechar');
    setTimeout(()=> conta.classList.remove('fechar'),300)
  }
  inputUsuario.value = inputSenha.value = '';
});
btnTransferir.addEventListener('click',function(e){
    e.preventDefault();
    const valor = Number(inputValor.value);
    const contareceber = contas.find(con => con.proprietário.toLowerCase() === String(inputTransferir.value).toLowerCase());
    inputTransferir.value = inputValor.value = '';
    inputTransferir.blur();
    if(valor > 0 && contaAtual.saldo >= valor && contareceber && contareceber.proprietário !== contaAtual.proprietário){
    contaAtual.movimentos.push(-valor);
    contareceber.movimentos.push(valor);
    movimentaçoes(contaAtual.movimentos);
    saldoTotal(contaAtual);
    }
});
btnEmprestimo.addEventListener('click',function(e){
    e.preventDefault();
    const valor = Number(inputEmprestimo.value);
    if(valor > 0 && contaAtual.movimentos.some(mov => mov >= valor)){
        contaAtual.movimentos.push(valor);
        movimentaçoes(contaAtual.movimentos);
        saldoTotal(contaAtual);
    }
    inputEmprestimo.value = '';
  });

btnfechar.addEventListener('click', function(e){
    e.preventDefault();
    conta.classList.add('fechar');
    setTimeout(()=>menuPrincipal.classList.remove('fechar') ,300)
  });