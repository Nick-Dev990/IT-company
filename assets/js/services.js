window.addEventListener("scroll", ()=>{
    const header= document.querySelector("header");
    if(window.scrollY >50){
        header.classList.add("sticky");
    }else{
        header.classList.remove("sticky");
    }
});
const counters=document.querySelectorAll(".counter");

const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            startCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
});

function startCounter(counter){
    const target=Number(counter.dataset.target);
    const suffix=counter.dataset.suffix;
    const duration=2500;
    const startTime=performance.now();

    function updateCounter(currentTime){
        const progress=Math.min((currentTime-startTime)/duration,1);
        const value=Math.floor(progress*target);

        counter.innerHTML=value+"<span>"+suffix+"</span>";

        if(progress<1){
            requestAnimationFrame(updateCounter);
        }else{
            counter.innerHTML=target+"<span>"+suffix+"</span>";
        }
    }

    requestAnimationFrame(updateCounter);
}

counters.forEach(counter=>{
    observer.observe(counter);
});