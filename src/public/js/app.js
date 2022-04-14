window.addEventListener('load', function(){
	new Glider(document.querySelector('.carousel__lista'), {
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: {
			prev: '.carousel__anterior',
			next: '.carousel__siguiente'
		},
		responsive: [
			{
			  // screens greater than >= 775px
			  breakpoint: 450,
			  settings: {
				// Set to `auto` and provide item width to adjust to viewport
				slidesToShow: 2,
				slidesToScroll: 2
			  }
			},{
			  // screens greater than >= 1024px
			  breakpoint: 800,
			  settings: {
				slidesToShow: 4,
				slidesToScroll: 4
			  }
			}
		]
	});
});



//menu celular
const menuBurger=document.querySelector('.menu__burger');
const menuLinks=document.querySelector('.menu__links');
const menuLinkUnete=document.querySelector('.menu__link--unete');

menuBurger.addEventListener('click',()=>{
    menuLinks.classList.toggle('links__visible');
    menuLinkUnete.classList.toggle('link__unete-visible');
});