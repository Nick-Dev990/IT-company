window.addEventListener("scroll", ()=>{
    const header= document.querySelector("header");
    if(window.scrollY >50){
        header.classList.add("sticky");
    }else{
        header.classList.remove("sticky");
    }
});
const featureBoxes= document.querySelectorAll(".feature-box");
featureBoxes.forEach(box=>{
    box.addEventListener("click", ()=>{
        featureBoxes.forEach(item=>{
            if (item!== box){
                item.classList.remove("active");
            }
        });
        box.classList.toggle("active");
    });
});
const faqItems= document.querySelectorAll(".faq-item");
faqItems.forEach(item=> {
    const question= item.querySelector(".faq-question");
    question.addEventListener("click", ()=>{
        faqItems.forEach(faq=>{
            if(faq!== item){
                faq.classList.remove("active");
            }
        });
        item.classList.toggle("active");
    });
});