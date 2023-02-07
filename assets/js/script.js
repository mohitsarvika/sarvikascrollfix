const innerWrapper = document.querySelector(".inner-wrapper"), //transfroms will be applied to this element
       scrollsections = document.querySelectorAll(".sec"),//elements going to trigger the translate on mouse wheels 
       yscrollableSec = document.querySelectorAll(".scrolly"), //sections with scroll enabled in Y axis
       totalChildren = innerWrapper.children.length,
       translateDelta = 100 / totalChildren, //transform value for each scroll
       maxTransX = translateDelta - 100; // max value to stop the transform on the last section

function setWidth(){
  innerWrapper.style.width = (totalChildren * (document.querySelector(".sec:first-child").offsetWidth)) + "px";
}
["load", "resize", "scroll"].forEach(function (evt) {
  window.addEventListener(evt, setWidth);
});
//event listner for all sections to call the scroller function
scrollsections.forEach(function (elem) {
  elem.addEventListener('wheel', scroller);
});

// scroll event on the vertically scrolling section OR to identify the scroll prosition of the sections scrolling in Y axis
yscrollableSec.forEach(function (elem) {
  elem.addEventListener("wheel", event => {
    let myDivHeight= Math.round(elem.querySelector(".content").offsetHeight);
    let parentHeight = Math.round(elem.offsetHeight);
    let absoluteScrolled = Math.round(elem.scrollTop);
      console.log(`content height ${myDivHeight}, parentHeight ${parentHeight} and scrolled ${absoluteScrolled}`);
    if( parentHeight + absoluteScrolled == myDivHeight){
      elem.classList.add("scroll-next"); // using this class horizontal next scroll will be called using scroller function
    }
    else if( elem.scrollTop == 0){
      elem.classList.add("scroll-prev"); // using this class horizontal previous scroll will be called using scroller function
    }
    else{
      // to scroll freely on the Y axis
      elem.classList.remove("scroll-prev");
      elem.classList.remove("scroll-next");
    }
    if(parentHeight >= myDivHeight){
      elem.classList.remove("scroll-prev");
      elem.classList.remove("scroll-next");
      elem.classList.remove("scrolly");
    }
  },);
});


// function to trigger the transform to get the scroll effect on the X axis
function scroller(){
  let elemIndex = Array.from(this.parentNode.children).indexOf(this);
  let scrollValNext = translateDelta * (elemIndex + 1) * (-1);
  let scrollValPrev = scrollValNext + (2*translateDelta);

  scrollValNext = (scrollValNext < maxTransX) ? maxTransX : scrollValNext;
  scrollValPrev = (scrollValPrev > 0) ? 0 : scrollValPrev;
  
  if(this.classList.contains("scrolly") && this.classList.contains("scroll-prev") && checkScrollDirectionIsUp(event)){
    tanslateX(scrollValPrev);
  }
  if(this.classList.contains("scrolly") && this.classList.contains("scroll-next") && checkScrollDirectionIsUp(event) == false){
    tanslateX(scrollValNext);
  }
  if(this.classList.contains("scrolly") == false){
    if(checkScrollDirectionIsUp(event)){
      tanslateX(scrollValPrev);
      } 
      else{
        tanslateX(scrollValNext);
    }
  }
}

function tanslateX(value){
  innerWrapper.style.transform="translateX("+value+"%)";
}

// to check scroll direction
function checkScrollDirectionIsUp(event) {
  if (event.wheelDelta) {
    return event.wheelDelta > 0;
  }
  return event.deltaY < 0;
}

//toggle functionality
document.querySelector('#nav-toggle').addEventListener("click", navToggle);
function navToggle(){
	document.querySelector("header").classList.toggle("expand");
}



