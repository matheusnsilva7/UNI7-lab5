const perguntas= document.querySelectorAll("dt");

perguntas.forEach((a)=>{
    a.addEventListener("click",(a)=>{
        const resposta = a.currentTarget.nextElementSibling
        resposta.classList.toggle("resposta")
    })
})