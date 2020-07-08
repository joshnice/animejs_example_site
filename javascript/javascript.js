let translate_x, direction;

window.onload = async function() {

    sideMenuAnimations();
    notificationAnimations();

    console.log('loading is complete');
};

function notificationAnimations() {

    $('#notification-alert-1').hide();
    
    // notifications animation 1
    const end_new_animation = anime(createNotificationAnimation('#notification-example-1', 3, 200, 3));
    const start_new_animation = anime(createNotificationAnimation('#notification-example-1', 5, 200, 7  , () => {end_new_animation.play()}));

    $("#new-notification-button-1").on( "click", function() {
        start_new_animation.play();
        $('#notification-alert-1').show();
    });
   

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
        height: ['100px', window_height / 4],
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
        height: ['100px', window_height / 4],
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
