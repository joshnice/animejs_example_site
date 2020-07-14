let translate_x, direction;

window.onload = async function() {

    sideMenuAnimations();
    notificationAnimations();
    
    anchorAnimationScrolling();

    console.log('loading is complete');
};

function notificationAnimations() {

    let allow_notifications_open = false;

    $('#notification-alert-1').hide();
    $('#not-header').hide();
    $('#notification-group').hide();
    $('#notification-text').hide();
    
    
    // notifications animation alert
    const end_new_animation = anime(createNotificationAnimation('#notification-example-1', 3, 200, 2));
    const start_new_animation = anime(createNotificationAnimation('#notification-example-1', 5, 200, 6, () => {end_new_animation.play()}));

    const open_notifications = anime(createBlockChangeAnimation('#notification-example-1', ['50%', '5%'], '300px', ['50px', '200px'], 3000,
        '#FFF', '2px solid black', () => {$('#notification-text').show(); $('#not-header').show(); notification_header_animation.play();}));

    const notification_header_animation = anime(createTextAnimation('.notification-header', 10, 500, () => {$('#notification-group').show(); notifications_animation.play();}));
    const notifications_animation = anime(createTextAnimation('.notification', 10, 500));

    $("#new-notification-button-1").on( "click", function() {
        start_new_animation.play();
        $('#notification-alert-1').show();
        $("#notification-example-1").css("cursor", 'pointer');
        allow_notifications_open = true;
    });

    $('#notification-example-1').on("click", function () {
        if (allow_notifications_open) {
            allow_notifications_open = false;
            $("#notification-example-1").css("cursor", 'default');
            $('#notification-alert-1').hide();
            $('#notification-bell-1').hide();
            open_notifications.play();
        } else {
            // TODO: Close notifications
        }
    });

    // TODO: Dismiss notifications

}

function createTextAnimation(target, translate, duration, complete = () => {}) {
    return {    
        targets: target,
        translateX: translate,
        easing: 'easeInOutQuad',
        duration: duration,
        autoplay: false,
        complete : complete
    }
}

function createBlockChangeAnimation(target, border_radius, width, height, duration, colour, border, complete = () => {}) {
    return {
        targets: target,
        borderRadius: border_radius,
        easing: 'easeInOutQuad',
        width: width,
        height: height,
        duration: duration,
        backgroundColor: colour,
        border: border,
        autoplay: false,
        complete : complete
    }
}

function createNotificationAnimation(target, translate, duration, loop, complete = () => {}) {
    return { 
        targets: target,
        keyframes: [
            {translateX: translate},
            {translateX: -(translate)},
            {translateX: 0}
        ],
        duration: duration,
        loop: loop,
        easing: 'linear',
        autoplay: false,
        complete: complete
    }
}

function sideMenuAnimations() {
    const window_height = window.innerHeight;
    const menu_text_1 = insertingMenuElements('menu-text-1');
    const menu_text_2 = insertingMenuElements('menu-text-2');

    for (let i = 0; i < menu_text_1.length; i++) {
        $('#' + menu_text_1[i]).hide();
        $('#' + menu_text_2[i]).hide();

    }

    // side bar animation 1
    const side_bar_menu_animations = anime({
        targets: '#side-menu-example-1',
        borderRadius: ['50%', '0%'],
        easing: 'easeInOutQuad',
        width: '300px',
        height: ['100px', calculateBoxHeight(window_height)],
        duration: 3000,
        autoplay: false,
        complete: function() {
            translate_x = 100;
            animateMenuText(menu_text_1);
        }
    });

    $( "#side-menu-example-1" ).on( "click", function() {
        side_bar_menu_animations.play();
    });


    // side bar animation 2
    const side_bar_menu_animations_2 = anime({
        targets: '#side-menu-example-2',
        rotate: [-180, 0],
        width: '300px',
        height: ['100px', calculateBoxHeight(window_height)],
        duration: 4000,
        easing: 'easeInOutExpo',
        autoplay: false, 
        complete: function() {
            translate_x = 20;
            direction = true;
            animateMenuText(menu_text_2);
            direction = false;
        }
    });

    $("#side-menu-example-2").on( "click", function() {
        side_bar_menu_animations_2.play();
    });
}

function insertingMenuElements(name) {
    const menu_text_elements = document.getElementsByClassName(name);
    const menu_text_ids = [];

    for (let i = 0; i < menu_text_elements.length; i++) {
        menu_text_ids.push(menu_text_elements[i].id);
    }

    return menu_text_ids;
}

function animateMenuText(menu_text, index = 0) {

    let animation_direction = 'normal'
    let translate_actual_x = translate_x;

    if (menu_text[index] == null) {
        return;
    }

    $('#' + menu_text[index]).show();

    const side_bar_text_animaition = anime({    
        targets: '#' + menu_text[index],
        translateX: translate_actual_x,
        delay: anime.stagger(100),
        direction: animation_direction,
        complete: function() {
            index++;
            animateMenuText(menu_text, index);
        }
    });

    side_bar_text_animaition.play();
}

function calculateBoxHeight(window_height) {
    const box_height = window_height / 4;

    if (box_height > 190) {
        return 190;
    }

    return box_height;
}

function anchorAnimationScrolling() {
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}
