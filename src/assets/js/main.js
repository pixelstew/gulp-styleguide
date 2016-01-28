//FASTCLICK - REMOVE 300ms delay on mobile browsers

!function(){"use strict";function t(e,o){function i(t,e){return function(){return t.apply(e,arguments)}}var r;if(o=o||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=o.touchBoundary||10,this.layer=e,this.tapDelay=o.tapDelay||200,this.tapTimeout=o.tapTimeout||700,!t.notNeeded(e)){for(var a=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],c=this,s=0,u=a.length;u>s;s++)c[a[s]]=i(c[a[s]],c);n&&(e.addEventListener("mouseover",this.onMouse,!0),e.addEventListener("mousedown",this.onMouse,!0),e.addEventListener("mouseup",this.onMouse,!0)),e.addEventListener("click",this.onClick,!0),e.addEventListener("touchstart",this.onTouchStart,!1),e.addEventListener("touchmove",this.onTouchMove,!1),e.addEventListener("touchend",this.onTouchEnd,!1),e.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(e.removeEventListener=function(t,n,o){var i=Node.prototype.removeEventListener;"click"===t?i.call(e,t,n.hijacked||n,o):i.call(e,t,n,o)},e.addEventListener=function(t,n,o){var i=Node.prototype.addEventListener;"click"===t?i.call(e,t,n.hijacked||(n.hijacked=function(t){t.propagationStopped||n(t)}),o):i.call(e,t,n,o)}),"function"==typeof e.onclick&&(r=e.onclick,e.addEventListener("click",function(t){r(t)},!1),e.onclick=null)}}var e=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!e,o=/iP(ad|hone|od)/.test(navigator.userAgent)&&!e,i=o&&/OS 4_\d(_\d)?/.test(navigator.userAgent),r=o&&/OS [6-7]_\d/.test(navigator.userAgent),a=navigator.userAgent.indexOf("BB10")>0;t.prototype.needsClick=function(t){switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(o&&"file"===t.type||t.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(t.className)},t.prototype.needsFocus=function(t){switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},t.prototype.sendClick=function(t,e){var n,o;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),o=e.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(t),!0,!0,window,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,t.dispatchEvent(n)},t.prototype.determineEventType=function(t){return n&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},t.prototype.focus=function(t){var e;o&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type&&"month"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},t.prototype.updateScrollParent=function(t){var e,n;if(e=t.fastClickScrollParent,!e||!e.contains(t)){n=t;do{if(n.scrollHeight>n.offsetHeight){e=n,t.fastClickScrollParent=n;break}n=n.parentElement}while(n)}e&&(e.fastClickLastScrollTop=e.scrollTop)},t.prototype.getTargetElementFromEventTarget=function(t){return t.nodeType===Node.TEXT_NODE?t.parentNode:t},t.prototype.onTouchStart=function(t){var e,n,r;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),n=t.targetTouches[0],o){if(r=window.getSelection(),r.rangeCount&&!r.isCollapsed)return!0;if(!i){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=n.pageX,this.touchStartY=n.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},t.prototype.touchHasMoved=function(t){var e=t.changedTouches[0],n=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>n||Math.abs(e.pageY-this.touchStartY)>n?!0:!1},t.prototype.onTouchMove=function(t){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},t.prototype.findControl=function(t){return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},t.prototype.onTouchEnd=function(t){var e,a,c,s,u,l=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(t.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,a=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,r&&(u=t.changedTouches[0],l=document.elementFromPoint(u.pageX-window.pageXOffset,u.pageY-window.pageYOffset)||l,l.fastClickScrollParent=this.targetElement.fastClickScrollParent),c=l.tagName.toLowerCase(),"label"===c){if(e=this.findControl(l)){if(this.focus(l),n)return!1;l=e}}else if(this.needsFocus(l))return t.timeStamp-a>100||o&&window.top!==window&&"input"===c?(this.targetElement=null,!1):(this.focus(l),this.sendClick(l,t),o&&"select"===c||(this.targetElement=null,t.preventDefault()),!1);return o&&!i&&(s=l.fastClickScrollParent,s&&s.fastClickLastScrollTop!==s.scrollTop)?!0:(this.needsClick(l)||(t.preventDefault(),this.sendClick(l,t)),!1)},t.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},t.prototype.onMouse=function(t){return this.targetElement?t.forwardedTouchEvent?!0:t.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1):!0:!0},t.prototype.onClick=function(t){var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail?!0:(e=this.onMouse(t),e||(this.targetElement=null),e)},t.prototype.destroy=function(){var t=this.layer;n&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},t.notNeeded=function(t){var e,o,i,r;if("undefined"==typeof window.ontouchstart)return!0;if(o=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(e=document.querySelector("meta[name=viewport]")){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(o>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(a&&(i=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),i[1]>=10&&i[2]>=3&&(e=document.querySelector("meta[name=viewport]")))){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===t.style.msTouchAction||"manipulation"===t.style.touchAction?!0:(r=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],r>=27&&(e=document.querySelector("meta[name=viewport]"),e&&(-1!==e.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===t.style.touchAction||"manipulation"===t.style.touchAction?!0:!1)},t.attach=function(e,n){return new t(e,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return t}):"undefined"!=typeof module&&module.exports?(module.exports=t.attach,module.exports.FastClick=t):window.FastClick=t}();




// In content JS execution
function doContentJS() {
  if (typeof contentInit == "function") {
    contentInit();
  }
};

// Bind onload events
function addWindowBind(functionName) {
  if (typeof functionName == "function") {
    if (window.addEventListener){ // compliant
      window.addEventListener("load", functionName, false);
    } else if (window.attachEvent){ // IE support
      window.attachEvent("onload", functionName);
    }
  }
};

/*
Global url of current page to be used throughout JS

Usage:
    url.href - full url
    url.protocol - http etc
    url.hostname - domain name
    url.port - port nos
    url.pathname - path
    url.search - query string
    url.hash  - hash value

*/

var thisUrl = document.createElement('a');
thisUrl.href = window.location.href;





// Cookies
cookie = {
    create: function(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else {
            var expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    },
    read: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    },
    erase: function(name) {
        cookie.create(name, "", -1);
    }
};

//Track button clicks
(function($) {

    $(".button, .faux-block-link__overlay").on({

        click: function(event) {

            //event.preventDefault();

            var elementClicked = $(this),
                parentElement,
                buttonText;

            if ($(this).is("input, button")) {
                //form input
                buttonText = $(elementClicked).val();

            } else if ($(this).hasClass("faux-block-link__overlay")) {

                parentElement = $(elementClicked).parent().prop('tagName');
                buttonText = $(elementClicked).closest(parentElement).find('.button').text();

            }

            //If button text exists, track its click
            if (buttonText) {

                var trackingData = {
                    event: 'buttonClick',
                    buttonCTA: buttonText,
                    buttonLocation: thisUrl.pathname
                }

                doTracking(trackingData);
            }
        }
    });

})(jQuery);



//Global function to track DataLayer.
function doTracking(objectToTrack) {
    dataLayer.push(objectToTrack);
}

function loadScript(urlJS, urlCss, callback) {


    //Add the extra script and css tag to the head
    var head = document.getElementsByTagName('head')[0];

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = urlCss;

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = urlJS;

    // Then bind the event to the callback function.
    //script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading

    head.appendChild(script);
    head.appendChild(link);


}



//Fix focus on skipto links for Chrome and IE
//http://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
window.addEventListener("hashchange", function(event) {
    var element = document.getElementById(location.hash.substring(1));
    if (element) {
        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
            element.tabIndex = -1;
        }
        element.focus();
    }
}, false);


// Set Shelter object
var shelter = {};

// Cookie bar
(function($) {
  if (typeof shelter.cookiebar == "undefined") shelter.cookiebar = {
    init: function() {
      var x = cookie.read('cookiesAccepted');
      if (!x) {
        //only load cookie bar if first visit
        $.get("//england.shelter.org.uk/assets/content/global/notifications/cookies", function(cookieBarContent) {
          $("footer").after(cookieBarContent);
          setTimeout(function() {
          $("#js-cookiebar").slideDown("1000");
          cookie.create("cookiesAccepted", 1, 720);
        }, 500);

        $("body").on("click", "#js-cookiebar-close", function() {
          event.preventDefault();
          $("#js-cookiebar").slideUp("1000", function() {
            $(this).remove();
          });
        });
      });
    }
  }
}
})(jQuery);



$(document).ready(function() {
    //init cookie
    shelter.cookiebar.init();

    // autorun content JS
    addWindowBind(doContentJS);

    //init fastclick
    $(function() {
      FastClick.attach(document.body);
    });

$('.code-view pre').addClass('language-handlebars');


  //END CAROUSEL //////////////////////////////////

//FUNCTIONS FOR OFF-CANVAS //////////////////////

//Remove horizontal scroll
function removeCanvas() {
  $('.js-page-wrapper').css('overflow', 'hidden');
}

//Close menu function
function closeMenu() {
  $("html").removeClass("openNav");
  setTimeout(removeCanvas, 500);
}


if($('.card--article img[attr=""]')){
  $(this).addClass('hide');
}






//Click event document
$(document).on('click', function(event) {



var target = $(event.target);

//END MAIN NAV DROPDOWN ///////////////////////

  if (!$(event.target).closest('.js-main-nav', '.js-main-nav > ul').length) {
    // Hide the menus if click on page other than nav.
    $('.js-main-nav').removeClass('js-active');
    $('.js-sub').parent().removeClass('js-active');

  }else{

    if($(event.target).hasClass('js-sub')){

      if($(event.target).parent().hasClass('js-active')){
        $(event.target).parent().removeClass('js-active');
        return false;

      }else if($(event.target).hasClass('js-sub')){
        $('.js-sub').parent().removeClass('js-active');
        $(event.target).parent().addClass('js-active');


      }else{
        $('.js-main-nav').removeClass('js-active');
      }

    } else {

      $('.js-main-nav').removeClass('js-active');
      $(event.target).parent().toggleClass('js-active');
      $('.js-sub').removeClass('js-active').next().removeClass('js-active');
    }
  }

  //END MAIN NAV DROPDOWN ///////////////////////


  //HOVER EFFECT FOR CARDS

  $('.card').hover(function(){
    $(this).toggleClass('hover');
  });

  //END HOVER EFFECT FOR CARDS


  //REVEAL AND CLOSE OFFCANVAS MENU /////////////

  //If click event not on menu link
  if (!$(event.target).closest('.open-panel').length) {

    //If click event is on open menu
    if($(event.target).closest('ul.styleguide-nav').length){
      //Do nothing
      event.preventDefault;
    } else {
      //Close menu
      closeMenu();
    }
  //If click event is on menu link
  } else {
    //if menu already open
    if($("html").hasClass("openNav")){
      //close menu
      closeMenu();
    //If menu closed
    } else {
    // Open menu
    $("html").addClass("openNav");
    $('.js-page-wrapper').css('overflow', 'visible');

    }
  }

  //END REVEAL AND CLOSE OFFCANVAS MENU //////////

  function animationsTest (callback) {
    // Test if ANY/ALL page animations are currently active

    var testAnimationInterval = setInterval(function () {
        if (! $.timers.length) { // any page animations finished
            clearInterval(testAnimationInterval);
            callback();
        }
    }, 25);
};

  var targethtml = target.closest('.js-html').length,
      targethbs  = target.closest('.js-hbs').length,
      targetClose  = target.closest('.code-view__close').length,
      $html = $('.code-view--html'),
      $hbs = $('.code-view--hbs');


     if(targethtml){

        event.preventDefault();

        $html.toggleClass('js-active');
        $hbs.removeClass('js-active');

     }else if(targethbs){

        event.preventDefault();

        $hbs.toggleClass('js-active');
        $html.removeClass('js-active');

     }else if(targetClose){
      $html.removeClass('js-active') && $hbs.removeClass('js-active')
     }




});


//Accordian unceck other inputs when dropdown clicked.
$('.block--accordian input').on('change', function() {
    $('.block--accordian input').not(this).prop('checked', false);
});




//RESTYLE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//TRIGGER MOBILE MENU
$('#js-menu').click(function(){
  $('#js-main-nav, #js-menu').toggleClass('js-active');
  $('#js-searchField, #js-search').removeClass('js-active');
});

//TRIGGER SITE SEARCH
$('#js-search').click(function(){
  $('#js-searchField, #js-search').toggleClass('js-active');
  $('#js-main-nav, #js-menu').removeClass('js-active');
});





});



//Read more drop download

$('.button--read-more').click(function(){
  $('.read-more-container').toggleClass('js-active');
  $('i', this).toggleClass('fa-chevron-down fa-chevron-up');
})
