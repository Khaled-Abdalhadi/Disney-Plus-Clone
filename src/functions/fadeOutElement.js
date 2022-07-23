/* This function is triggered by a scroll mouse event and it fades an element

	distanceToTop --> how far from the top is the element we r triggering
	scrollTop ---> how many pixels we have scrolled

	when the scroll to Top exceeds distance to top we increase/decrease the opacity
	based on our ratio calculator

	*/

const fadeOutElement = (element) => {
	if(!element) {
		return
	}
	var distanceToTop =  element.getBoundingClientRect().top;
	var elementHeight = element.offsetHeight;
	var scrollTop = document.documentElement.scrollTop;
	var opacity = 1;
	
	if (scrollTop > distanceToTop) {
		opacity = 0.7 - (scrollTop - distanceToTop)/(elementHeight/1.5);
	}
	
	if (opacity >= 0) {
		element.style.opacity = opacity;
	}
}

export default fadeOutElement;