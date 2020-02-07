$(document).ready(function(){
    //rut
    var no_permitidas = ['!', '"', '$', '%', '&', '/', '(', ')', '=', '?', 'Ã‚Â¿', '*', 'Ã‚Â¨', '^', '{', '}', 'Ãƒâ€¡', 'ÃƒÂ§', 'Ã‚Âª', 'Ã‚Âº', ',', 'Dead', 'Ã‚Â´', '+', '`', '_', '@', '#', '|', 'Ã‚Â¢', 'Ã¢Ë†Å¾', 'Ã‚Â¬', 'ÃƒÂ·', 'Ã¢â‚¬Â', 'Ã¢â€° ', 'Ã‚Â´'];
    var no_permitidas_eventkey = [192, 222, 16, 220, 186, 187];
    var permitidas_eventkey = [190, 173, 110];
    $("#rut").keyup(function(e) {
        var valorRut = $("#rut").val();
        if (!e.charCode) {
            key = String.fromCharCode(e.which);
        } else {
            key = String.fromCharCode(e.charCode);
        }
        if (no_permitidas_eventkey.indexOf(e.keyCode) !== -1 || no_permitidas.indexOf(e.key) !== -1) {
            e.preventDefault();
        }
        if (e.keyCode !== 8 && e.keyCode !== 9 && e.keyCode !== 37 && e.keyCode !== 39 && e.keyCode !== 91 && e.keyCode !== 86 && e.keyCode !== 190) {
            if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 75 || permitidas_eventkey.indexOf(e.keyCode) !== -1) {
                console.log("k");
            } else {
                if (e.keyCode !== 13) {
                    if (String.fromCharCode(e.keyCode).match(/(\w|\s)/g)) {
                        valorRut = valorRut.substr(0, valorRut.length - 1);
                    }
                }
                vl(valorRut);
            }
        }
        vl(valorRut);
    });
    $("#rut").focusout(function() {
        var vrt = $(this).val();
        $(this).val(formatear(vrt))
        if (!$(this).val()) {
            $("#rut").removeClass("invalid valid");
        }
    });
    //focus para el label
    $(".input-std label").click(function(){
        $(this).parent().find("input").focus();
    });
    //focus para el label
    $(".input-std-textarea label").click(function(){
        $(this).parent().find("textarea").focus();
    });
    //solo numeros
    $(".soloNumeros").inputFilter(function(value){
        return /^-?\d*$/.test(value);
    });
    //solo nombre
    $(".soloLetras").inputFilter(function(value){
        return /^[A-zÀ-ÖØ-öø-ÿ´`-]*$/i.test(value);
    });
    //solo texto y espacio
    $(".soloNombre").inputFilter(function(value){
        return /^[ A-zÀ-ÖØ-öø-ÿ´`-]*$/i.test(value);
    });
    //contador textarea
    $(".input-std-textarea > textarea").keyup(function(){
        var valor = $(this).val().length;
        $(this).parent().find(".contador-text").find("span").text(valor);
    });
    //validacion telefono
    $(".input-std input.telefono").focusout(function(){
        if($(this).val()){
            if( $(this).val().length < 8 ){
                $(this).addClass("invalid").removeClass("valid");
            }else{
                $(this).removeClass("invalid").addClass("valid");
            }
        }else{
            $(this).removeClass("invalid valid");
        }
    });
    //mail
    $(".email").focusout(function(){
        isMail($(this).val(), $(this));
    });

    $(".monto").keyup(function(e){
        $(e.target).val(function(index, value) {
            return value.replace(/\D/g, "")
              .replace(/([0-9])([0-9]{3})$/, '$1.$2')
              .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
          });
    });

    //monto
    $(".input-std > .monto").focusout(function(){
        if( $(this).val() ){
            var attr = $(this).attr("monto-minimo");
            if( typeof attr !== typeof undefined && attr !== false ){
                var valMin = parseInt($(this).attr("monto-minimo").split(".").join(""));
                var valMax = parseInt($(this).attr("monto-maximo").split(".").join(""));
                var monto = parseInt($(this).val().split(".").join(""));
                if( monto < valMin ){
                    $(this).removeClass("valid").addClass("invalid").parent().find(".msj-input-error").text("El monto mínimo es de $"+valMin+".");
                }else if(monto > valMax){
                    $(this).removeClass("valid").addClass("invalid").parent().find(".msj-input-error").text("El monto máximo es de $"+valMax+".");
                }else{
                    $(this).removeClass("invalid").addClass("valid");
                }
            }
        }else{
            $(this).removeClass("valid invalid");
        }
    });

    //select
    if ($('.select--style').length) {

        $( ".select--style" ).each(function() {
          var self = $(this);
          var selector = self.find('select')
          var list = document.createElement('ul');
          var firstElement = 1;
          
          selector.find("option").each(function(){
              var optionLabel = $(this).text();
              var listItem = document.createElement('li');
              var listLink = document.createElement('a');
              var listLinkText = document.createTextNode(optionLabel);
              if(firstElement){
                  --firstElement;
                  listLink.classList.add('active');
              }
              listLink.classList.add('select-value');
              listLink.appendChild(listLinkText);
              listItem.appendChild(listLink);
              list.appendChild(listItem);
          });

          self.append(list);
        });


        $('.select--style').on('click', '.select__input', function (event) {
            //event.preventDefault();
            var self = $(this);
            $('.select--style').find('ul:first').stop().slideUp(1);
            self.parent().find('ul:first').stop().slideToggle();
            self.children('.select__line').toggleClass('line--active');
        });
        $('.select--style').on('click', '.select-value', function (event) {
            //event.preventDefault();
            var self = $(this);
            var index = self.parent().index();
            var parent = self.parents('.select--style');
            parent.find('.select-value').removeClass('active');
            parent.find('ul:first').stop().slideUp();
            parent.find('select:first')[0].selectedIndex = index;
            self.addClass('active');
            self.parent().parent().parent().children('.select__input').children('.select__line').removeClass('line--active');
            if(self.text() === ''){
                self.parent().parent().parent().children('.select__input').children('label').removeClass('label--active');
            }else{
                self.parent().parent().parent().children('.select__input').children('label').addClass('label--active');
            }
        });
        $('.select__input select').change(function(){
            if($(this).val() !== 'null'){
                $(this).next('label').addClass('label--active');
            }else{
                $(this).next('label').removeClass('label--active');
                $(this).focusout();
            }
        })
    }

    //modal
    if ($('.js-modal').length) {
        $('body').on('click', '.js-modal', function (event) {
            event.preventDefault();
            if ($('.modal').hasClass('modal--active')) {
                $('.modal').removeClass('modal--active');
            }
            target = $(this).attr('href');
            $(target).addClass('modal--active');
        });
        $('.modal').on('click', '.modal__btn, .js-close-modal', function (event) {
            $(this).parents('.modal').removeClass('modal--active');
        });
        $('body').on('click', function (event) {
            element = $(event.target);
            if ($(element).hasClass('modal-out')) {
                $(element).removeClass('modal--active');
            }
        });
    }

    //tab
    $('.tab').on('click', '.tab__item', function (event) {
        var id = $(this).attr('href');
        $(this).parents('.tab').find('.tab__item').removeClass('tab__item--active').parents('.tab').find('.tab__pane').hide();
        $(this).addClass('tab__item--active');
        $(this).parents('.tab').find('[data-rel="' + id + '"]').show(); 
    });

    //condiciones
    if ($('.js-accordion').length) {
        $('.js-accordion--active .box__body').hide();
        $(".js-accordion").on("click", ".js-accordion__trigger", function(event) {
            $(this).parents(".js-accordion").toggleClass("js-accordion--active"), $(this).next().slideToggle();
        });
    }
});

//funciones
(function($){
    $.fn.inputFilter = function(inputFilter){
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function(){
            if( inputFilter(this.value) ){
               this.oldValue = this.value;
               this.oldSelectionStart = this.selectionStart;
               this.oldSelectionEnd = this.selectionEnd;
            }else if(this.hasOwnProperty("oldValue")){
               this.value = this.oldValue;
               this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }else{
               this.value = "";
            }
        });
    };
}(jQuery));

//resize textarea
(function($){
    $(".resize-textarea").each(function(){
        var $this = $(this);
        $this.css("min-height", $this.css("height"));
        $this.css("overflow", "hidden");
    }).on("input paste", function(){
        var $this = $(this);
        var offset = $this.innerHeight() - $this.height();
        if( $this.innerHeight < this.scrollHeight ){
            $this.height(this.scrollHeight - offset);
        }else{
            $this.height(1);
            $this.height(this.scrollHeight - offset);
        }
    });
}(jQuery));

function isMail(mail, el){
    var rg=/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!rg.test(mail)){
        if(mail==""){
            el.removeClass("invalid valid");
            return false;
        }else{
            el.removeClass("valid").addClass("invalid");
            return false;
        }
    }else{
        el.removeClass("invalid").addClass("valid");
        return true;
    }
}

function vl(vl) {
    var rut = vl;
    while (rut.charAt(0) === '0') {
        rut = rut.substr(1)
    }
    $("#rut").val(rut)
}

function formatear(vv) {
    var iniVal = this.quitar_formato(vv);
    var rut_2 = iniVal.substring(0, iniVal.length - 1),
        f = "";
    while (rut_2.length > 3) {
        f = '.' + rut_2.substr(rut_2.length - 3) + f;
        rut_2 = rut_2.substring(0, rut_2.length - 3);
    }
    if ($.trim(rut_2) === '') {
        return '';
    } else {
        var ok = rut_2 + f + "-" + iniVal.charAt(iniVal.length - 1);
        if (valida(ok)) {
            $("#rut").removeClass("invalid").addClass("valid");
        } else {
            $("#rut").removeClass("valid").addClass("invalid");
        }
        return rut_2 + f + "-" + iniVal.charAt(iniVal.length - 1);
    }
}

function quitar_formato(rut) {
    rut = rut.split(' ').join('').split('-').join('').split('.').join('');
    return rut;
}

function valida(rutValidar) {
    if (!/[0-9]{1,3}.[0-9]{3}.[0-9]{3}-[0-9Kk]{1}/.test(rutValidar) || /^00*/.test(rutValidar)) {
        $("#rut").removeClass("valid").addClass("invalid");
    } else {
        $("#rut").removeClass("invalid").addClass("valid");
    }
    var tmp = rutValidar.split('-');
    var dv_2 = tmp[1],
        rut_v2 = tmp[0].split('.').join('');
    if (dv_2 === 'K' || dv_2 === 'k') {
        dv_2 = 'k';
    } else {
        dv_2 = parseInt(tmp[1]);
    }
    return (dv(rut_v2) === dv_2)
}

function dv(rut) {
    var M = 0,
        S = 1;
    for (; rut; rut = Math.floor(rut / 10)) {
        S = (S + rut % 10 * (9 - M++ % 6)) % 11;
    }
    if (S) {
        return S - 1;
    } else {
        return 'k'
    }
}

//ola botones
(function(window) {
    'use strict';
    var Waves = Waves || {};
    var $$ = document.querySelectorAll.bind(document);
    function isWindow(obj) {
        return obj !== null && obj === obj.window;
    }
    function getWindow(elem) {
        return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }
    function offset(elem) {
        var docElem, win,
            box = {top: 0, left: 0},
            doc = elem && elem.ownerDocument;
        docElem = doc.documentElement;
        if (typeof elem.getBoundingClientRect !== typeof undefined) {
            box = elem.getBoundingClientRect();
        }
        win = getWindow(doc);
        return {
            top: box.top + win.pageYOffset - docElem.clientTop,
            left: box.left + win.pageXOffset - docElem.clientLeft
        };
    }
    function convertStyle(obj) {
        var style = '';
        for (var a in obj) {
            if (obj.hasOwnProperty(a)) {
                style += (a + ':' + obj[a] + ';');
            }
        }
        return style;
    }
    var Effect = {
        duration: 750,
        show: function(e, element) {
            if (e.button === 2) {
                return false;
            }
            var el = element || this;
            var ripple = document.createElement('div');
            ripple.className = 'waves-ripple';
            el.appendChild(ripple);
            var pos         = offset(el);
            var relativeY   = (e.pageY - pos.top);
            var relativeX   = (e.pageX - pos.left);
            var scale       = 'scale('+((el.clientWidth / 100) * 10)+')';
            if ('touches' in e) {
              relativeY   = (e.touches[0].pageY - pos.top);
              relativeX   = (e.touches[0].pageX - pos.left);
            }
            ripple.setAttribute('data-hold', Date.now());
            ripple.setAttribute('data-scale', scale);
            ripple.setAttribute('data-x', relativeX);
            ripple.setAttribute('data-y', relativeY);
            var rippleStyle = {
                'top': relativeY+'px',
                'left': relativeX+'px'
            };
            ripple.className = ripple.className + ' waves-notransition';
            ripple.setAttribute('style', convertStyle(rippleStyle));
            ripple.className = ripple.className.replace('waves-notransition', '');
            rippleStyle['-webkit-transform'] = scale;
            rippleStyle['-moz-transform'] = scale;
            rippleStyle['-ms-transform'] = scale;
            rippleStyle['-o-transform'] = scale;
            rippleStyle.transform = scale;
            rippleStyle.opacity   = '1';
            rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
            rippleStyle['-moz-transition-duration']    = Effect.duration + 'ms';
            rippleStyle['-o-transition-duration']      = Effect.duration + 'ms';
            rippleStyle['transition-duration']         = Effect.duration + 'ms';
            rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['-moz-transition-timing-function']    = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['-o-transition-timing-function']      = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['transition-timing-function']         = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            ripple.setAttribute('style', convertStyle(rippleStyle));
        },
        hide: function(e) {
            TouchHandler.touchup(e);
            var el = this;
            var width = el.clientWidth * 1.4;
            var ripple = null;
            var ripples = el.getElementsByClassName('waves-ripple');
            if (ripples.length > 0) {
                ripple = ripples[ripples.length - 1];
            } else {
                return false;
            }
            var relativeX   = ripple.getAttribute('data-x');
            var relativeY   = ripple.getAttribute('data-y');
            var scale       = ripple.getAttribute('data-scale');
            var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
            var delay = 350 - diff;
            if (delay < 0) {
                delay = 0;
            }
            setTimeout(function() {
                var style = {
                    'top': relativeY+'px',
                    'left': relativeX+'px',
                    'opacity': '0',

                    '-webkit-transition-duration': Effect.duration + 'ms',
                    '-moz-transition-duration': Effect.duration + 'ms',
                    '-o-transition-duration': Effect.duration + 'ms',
                    'transition-duration': Effect.duration + 'ms',
                    '-webkit-transform': scale,
                    '-moz-transform': scale,
                    '-ms-transform': scale,
                    '-o-transform': scale,
                    'transform': scale,
                };
                ripple.setAttribute('style', convertStyle(style));
                setTimeout(function() {
                    try {
                        el.removeChild(ripple);
                    } catch(e) {
                        return false;
                    }
                }, Effect.duration);
            }, delay);
        },
        wrapInput: function(elements) {
            for (var a = 0; a < elements.length; a++) {
                var el = elements[a];
                if (el.tagName.toLowerCase() === 'input') {
                    var parent = el.parentNode;
                    if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves-effect') !== -1) {
                        continue;
                    }
                    var wrapper = document.createElement('i');
                    wrapper.className = el.className + ' waves-input-wrapper';
                    var elementStyle = el.getAttribute('style');
                    if (!elementStyle) {
                        elementStyle = '';
                    }
                    wrapper.setAttribute('style', elementStyle);
                    el.className = 'waves-button-input';
                    el.removeAttribute('style');
                    parent.replaceChild(wrapper, el);
                    wrapper.appendChild(el);
                }
            }
        }
    };
    var TouchHandler = {
        touches: 0,
        allowEvent: function(e) {
            var allow = true;
            if (e.type === 'touchstart') {
                TouchHandler.touches += 1; 
            } else if (e.type === 'touchend' || e.type === 'touchcancel') {
                setTimeout(function() {
                    if (TouchHandler.touches > 0) {
                        TouchHandler.touches -= 1;
                    }
                }, 500);
            } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
                allow = false;
            }
            return allow;
        },
        touchup: function(e) {
            TouchHandler.allowEvent(e);
        }
    };
    function getWavesEffectElement(e) {
        if (TouchHandler.allowEvent(e) === false) {
            return null;
        }
        var element = null;
        var target = e.target || e.srcElement;
        while (target.parentElement !== null) {
            if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {
                element = target;
                break;
            } else if (target.classList.contains('waves-effect')) {
                element = target;
                break;
            }
            target = target.parentElement;
        }
        return element;
    }
    function showEffect(e) {
        var element = getWavesEffectElement(e);
        if (element !== null) {
            Effect.show(e, element);

            if ('ontouchstart' in window) {
                element.addEventListener('touchend', Effect.hide, false);
                element.addEventListener('touchcancel', Effect.hide, false);
            }

            element.addEventListener('mouseup', Effect.hide, false);
            element.addEventListener('mouseleave', Effect.hide, false);
        }
    }
    Waves.displayEffect = function(options) {
        options = options || {};

        if ('duration' in options) {
            Effect.duration = options.duration;
        }
        Effect.wrapInput($$('.waves-effect'));

        if ('ontouchstart' in window) {
            document.body.addEventListener('touchstart', showEffect, false);
        }
        document.body.addEventListener('mousedown', showEffect, false);
    };
    Waves.attach = function(element) {
        if (element.tagName.toLowerCase() === 'input') {
            Effect.wrapInput([element]);
            element = element.parentElement;
        }
        if ('ontouchstart' in window) {
            element.addEventListener('touchstart', showEffect, false);
        }
        element.addEventListener('mousedown', showEffect, false);
    };
    window.Waves = Waves;
    document.addEventListener('DOMContentLoaded', function() {
        Waves.displayEffect();
    }, false);
})(window);