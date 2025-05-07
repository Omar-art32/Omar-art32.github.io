// imagen_perfil


// Preloader
window.addEventListener('load', function() {
    document.querySelector('.preloader').style.display = 'none';
});

// Navbar Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }

        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    });
});

// Portfolio Filter
$(document).ready(function() {
    var $grid = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('.portfolio-filter button').on('click', function() {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });

        $('.portfolio-filter button').removeClass('active');
        $(this).addClass('active');
    });
});

// Testimonial Slider
$(document).ready(function() {
    $('.testimonial-slider').slick({
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        infinite: true,
        speed: 800,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});

// AOS Initialization
AOS.init();

// =============================================
// FORMULARIO DE CONTACTO (jQuery)
// =============================================
$(document).ready(function() {
    if ($('#contactForm').length) {
        $('#contactForm').submit(function(e) {
            e.preventDefault();
            
            const $form = $(this);
            const $submitBtn = $form.find('button[type="submit"]');
            const $formMessages = $('#form-messages');
            
            // Mostrar estado de "enviando"
            $submitBtn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...');
            $submitBtn.prop('disabled', true);
            
            // Configuración para FormSubmit
            $.ajax({
                url: 'https://formsubmit.co/ajax/tuemail@gmail.com', // REEMPLAZA CON TU EMAIL
                method: 'POST',
                data: {
                    nombre: $('#nombre').val(),
                    email: $('#email').val(),
                    asunto: $('#asunto').val(),
                    mensaje: $('#mensaje').val()
                },
                dataType: 'json',
                success: function(response) {
                    $formMessages.html('<div class="alert alert-success mt-3">¡Mensaje enviado con éxito!</div>');
                    $form[0].reset();
                },
                error: function(xhr, status, error) {
                    $formMessages.html('<div class="alert alert-danger mt-3">Error al enviar. Por favor intenta nuevamente.</div>');
                },
                complete: function() {
                    $submitBtn.html('Enviar Mensaje');
                    $submitBtn.prop('disabled', false);
                    
                    setTimeout(function() {
                        $formMessages.empty();
                    }, 5000);
                }
            });
        });
    }
});