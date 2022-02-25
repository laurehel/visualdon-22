function domForEach(selector, callback) {
    document.querySelectorAll(selector).forEach(callback);
}
function domOn(selector, event, callback, options) {
    domForEach(selector, ele => ele.addEventListener(event, callback, options));
}

// domForEach('.questionnaire dd', ele => ele.classList.add('hidden'));
  
domOn('#rectangle', 'click', evt => {
    const ele = evt.currentTarget;
    const rect = ele.querySelector('rect');
    const color = rect.getAttribute("fill");
    rect.setAttribute("fill", color == "black" ? "red" : "black");
});

domOn('#donut', 'mouseover', evt => {
    const ele = evt.currentTarget;
    const circle = ele.querySelectorAll('circle')[0];
    const rayon = circle.getAttribute("r");
    circle.setAttribute("r", 80);
});
domOn('#donut', 'mouseleave', evt => {
    const ele = evt.currentTarget;
    const circle = ele.querySelectorAll('circle')[0];
    const rayon = circle.getAttribute("r");
    circle.setAttribute("r", 60);
});
