let startX= 0;
let endX= 0;
let slides= document.querySelectorAll(".slide");
let index= 0;
let dots= document.querySelectorAll(".dot")

function splitText(element, delayStart= 0){
    let text= element.dataset.text;
    element.innerHTML="";

    text.split("").forEach((char, i)=>{
        let span= document.createElement("span");
        span.textContent= char;
        span.style.animationDelay=`${delayStart+i*0.09}s`;
        element.appendChild(span);
    });
}

function animateSlide(slide){
    let title= slide.querySelector(".title");
    let sub= slide.querySelector(".sub");
    let text= slide.querySelector(".text");
    let cta= slide.querySelector(".cta");

    splitText(title, 0);
    splitText(text, 0.5);

    cta.style.opacity= 0;
    setTimeout(()=>{
        cta.style.transition= "0.5s";
        cta.style.opacity= 1;
    }, 1500);
}
function updateDots(){
    dots.forEach(dot=>{
        dot.classList.remove("active");
    });
    dots[index].classList.add("active");
}
  
function showNextSlide(){
    slides[index].classList.remove("active");
    index= (index+1)% slides.length;

    let current= slides[index];
    current.classList.add("active");
    animateSlide(current);
    updateDots();
}
slides.forEach(slide=> {
    slide.querySelector(".title").dataset.text= slide.querySelector(".title").textContent;
    slide.querySelector(".sub").dataset.text= slide.querySelector(".sub").textContent;
    slide.querySelector(".text").dataset.text= slide.querySelector(".text").textContent;
});
dots.forEach((dot, i)=>{
    dot.addEventListener("click",()=>{
        slides[index].classList.remove("active");
        index=i;
        slides[index].classList.add("active");
        animateSlide(slides[index]);
        updateDots();
    });
});
function nextSlide(){
    slides[index].classList.remove("active");
    index= (index+1) % slides.length;
    slides[index].classList.add("active");
    animateSlide(slides[index]);
    updateDots();
}
function prevSlide(){
    slides[index].classList.remove("active");
    index= (index-1+slides.length) % slides.length;
    slides[index].classList.add("active");
    animateSlide(slides[index]);
    updateDots();
}

const hero= document.querySelector(".hero");
animateSlide(slides[0]);
setInterval(showNextSlide, 5000);

hero.addEventListener("touchstart", (e)=>{
    startX=  e.touches[0].clientX;
});
hero.addEventListener("touchend", (e)=>{
    endX= e.changedTouches[0].clientX;
    if (startX-endX >50){
        nextSlide();
    }
    if (endX-startX >50){
        prevSlide();
    }
});
hero.addEventListener("mousedown", (e)=>{
    startX= e.clientX;
});
hero.addEventListener("mouseup", (e)=> {
    endX= e.clientX;
    if (startX-endX >50){
        nextSlide();
    }
    if (endX-startX >50){
        prevSlide();
    }
});
window.addEventListener("scroll", ()=>{
    const header= document.querySelector("header");
    if(window.scrollY >50){
        header.classList.add("sticky");
    }else{
        header.classList.remove("sticky");
    }
});