'use strict';

const comentarios = [{
    nome : 'Heitor',
    comentario : 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.'
},{
    nome : 'Alice',
    comentario : 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,'
},{
    nome : 'Davi',
    comentario : 'Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,'
},{
    nome : 'Laura',
    comentario : 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their model text, and a search for lorem ipsum will uncover many web sites.'
}
];
const menuLinks = document.querySelector('.menu_web');
const links = document.querySelectorAll('ul');
const produtos = document.querySelector('.produtos');       
const btnEsquerda = document.querySelector('.esquerda');
const btnDireita = document.querySelector('.direita');
const comentarioTexto = document.querySelector('.comentarios_texto');
const comentarioNome = document.querySelector('.comentarios_nome');
const barraDePesquisa = document.querySelector('.menu_web_perquisa');
const menuCarinho = document.querySelector('.menu_carinho');
const menuCarinhoProdutos = document.querySelector('.menu_carinho_produtos');
const carinhoFechar = document.querySelector('.carinho_fechar');
const produtosCarinho = document.getElementsByClassName('produtos_carinho');
const carinho = document.querySelector(".carinho");
const total = document.querySelector("span");
const carinhoQuantidade = document.querySelector('.carinho_quantidade');
const carinhoRemover = document.getElementsByClassName('carinho_remover');
const carinhoFileira = document.getElementsByClassName('carinho_fileira');
const carinhoNome = document.querySelectorAll('.carinho_nome');
const produtosFileira = document.querySelectorAll('.produtos_fileira');
const btn = document.querySelectorAll('.btn')

let produtosNome = []
let precoTotal = []
let produtosLoja = []
let indice = 0;
let quantidade = 0;
let pesquisaNome = []

//Menu 
Array.from(btn).forEach(function(e){
    e.addEventListener('click',function(){
        menuLinks.classList.toggle('funcionar')
    })
})
carinhoFechar.addEventListener('click',function(){
    menuCarinhoProdutos.classList.remove('funcionar');
}) 

links.forEach(function(link){
    link.addEventListener('click',function(){
        menuLinks.classList.remove('funcionar');
    })
});
menuCarinho.addEventListener('click',function(){
    menuCarinhoProdutos.classList.add('funcionar');
    Array.from(carinhoRemover).forEach(function(e){
        e.addEventListener('click',function(){
        e.parentElement.remove();
        quantidade--;
        carinhoQuantidade.textContent = quantidade;
        precoTotal.unshift(-e.parentElement.lastElementChild.innerHTML.split(' ')[1]); 
        if(calcularTotal(precoTotal)< 0){
            total.textContent = `R$ 00.0`
        }else{
            total.textContent = `R$ ${calcularTotal(precoTotal).toFixed(1)}`;
        };
        produtosNome.splice(produtosNome.indexOf(e.parentElement.children[1].innerHTML));
        });
    });
});
barraDePesquisa.addEventListener('keyup',function(){
    const palavra = barraDePesquisa.value.toLowerCase();
    const barraProdutos = produtosLoja.items.filter(produtos =>{
        return produtos.product.name.toLowerCase().includes(palavra)
    })
    barraProdutos.forEach(function (a){ 
        pesquisaNome.push(a.product.name)
    })
    Array.from(produtos.children).forEach(function(e){
        if (!pesquisaNome.includes(e.children[1].innerHTML)){
            e.classList.add('display')
        }else{
            e.classList.remove('display')
        }
    })
    pesquisaNome = []
      /*produtos.innerHTML = '';
    displayProdutos(barraProdutos)*/  
});
//Produtos
produtos.innerHTML = '';
window.addEventListener('DOMContentLoaded',async function() {
    const produto = await fetch(`http://www.mocky.io/v2/5b15c4923100004a006f3c07`);
    produtosLoja = await produto.json();
    displayProdutos(produtosLoja.items);
});
const displayProdutos = function(a){
        a.forEach(function(produto){
        const html = `
            <div class="produtos_fileira">
                <div class="produtor_imagem"><img src="${produto.product.imageObjects[0].extraLarge}" rel="${produto.product.name}"></div>
                <div class="produtos_nome">${produto.product.name}</div>
                <div class="produtos_valor">R$ ${produto.product.priceSpecification.price}</div>
                <button class="produtos_carinho">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20">
                    <path d="M5.083 18.333Q4.354 18.333 3.844 17.823Q3.333 17.312 3.333 16.583V6.75Q3.333 6.021 3.844 5.51Q4.354 5 5.083 5H6.625Q6.646 3.604 7.625 2.635Q8.604 1.667 10 1.667Q11.396 1.667 12.375 2.635Q13.354 3.604 13.375 5H14.917Q15.646 5 16.156 5.51Q16.667 6.021 16.667 6.75V16.583Q16.667 17.312 16.156 17.823Q15.646 18.333 14.917 18.333ZM8.375 5H11.625Q11.604 4.333 11.135 3.875Q10.667 3.417 10 3.417Q9.333 3.417 8.865 3.875Q8.396 4.333 8.375 5ZM5.083 16.583H14.917Q14.917 16.583 14.917 16.583Q14.917 16.583 14.917 16.583V6.75Q14.917 6.75 14.917 6.75Q14.917 6.75 14.917 6.75H13.375V8.375Q13.375 8.729 13.115 8.99Q12.854 9.25 12.5 9.25Q12.146 9.25 11.885 8.99Q11.625 8.729 11.625 8.375V6.75H8.375V8.375Q8.375 8.729 8.115 8.99Q7.854 9.25 7.5 9.25Q7.146 9.25 6.885 8.99Q6.625 8.729 6.625 8.375V6.75H5.083Q5.083 6.75 5.083 6.75Q5.083 6.75 5.083 6.75V16.583Q5.083 16.583 5.083 16.583Q5.083 16.583 5.083 16.583ZM5.083 16.583Q5.083 16.583 5.083 16.583Q5.083 16.583 5.083 16.583V6.75Q5.083 6.75 5.083 6.75Q5.083 6.75 5.083 6.75Q5.083 6.75 5.083 6.75Q5.083 6.75 5.083 6.75V16.583Q5.083 16.583 5.083 16.583Q5.083 16.583 5.083 16.583Z"/>
                    </svg>
                </button>
            </div>
            `;
        produtos.insertAdjacentHTML('beforeend', html);
    });
    Array.from(produtosCarinho).forEach(function(e,i){
        carinho.innerHTML ='';
        e.addEventListener('click',function(obj){
            if(!produtosNome.includes(a[i].product.name)){
             const html =`
            <div class="carinho_fileira">
                    <div class="carinho_img"><img src="${a[i].product.imageObjects[0].extraLarge}" rel="${a[i].product.name}"></div>
                    <div class="carinho_nome">${a[i].product.name}</div>
                    <svg class="carinho_remover" xmlns="http://www.w3.org/2000/svg" height="20" width="20">
                        <path d="M4.125 5.083V3.333H7.062L7.896 2.5H12.104L12.938 3.333H15.875V5.083ZM6.75 17.5Q6.021 17.5 5.51 16.99Q5 16.479 5 15.75V5.958H15V15.75Q15 16.479 14.49 16.99Q13.979 17.5 13.25 17.5Z"/>
                    </svg>
                    <div class="carinho_valor">R$ ${a[i].product.priceSpecification.price}</div>
                </div>
            `;
            precoTotal.push(a[i].product.priceSpecification.price);
            total.textContent = `R$ ${calcularTotal(precoTotal).toFixed(1)}`;
            quantidade++;
            carinhoQuantidade.textContent = quantidade;
            carinho.insertAdjacentHTML('afterbegin', html);
            produtosNome.push(a[i].product.name);   
            }
        });
    });
};
const calcularTotal = function(arr,){
    return arr.reduce((a, b) => a + b, 0 );
};
//comentarios
const comentario = function(){
    comentarioTexto.textContent = comentarios[indice].comentario;
    comentarioNome.textContent = `- ${comentarios[indice].nome}`;
};
comentario()
btnEsquerda.addEventListener('click',function(){
    indice--;
    if(indice < 0){
        indice = comentarios.length - 1;
    }
    comentario();
});
btnDireita.addEventListener('click',function(){
    indice++;
    if(indice > 3){
        indice = 0;
    }
    comentario();
});