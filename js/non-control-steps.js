
window.addEventListener('load', () => {
    if (document.querySelector('.workflow__section-content_current').classList.contains('security-map')) {
        document.querySelector('.desk-tasks__button').textContent = 'Продолжить';
        document.querySelector('.desk__wrapper').style.height = "auto";
    }
    const popupMap = document.querySelector('.popup_map');
    const popupFinished = document.querySelector('.popup-finished');
    const dangerZones = document.querySelectorAll('.security-map__circle');
    document.querySelector('.security-map-counter__total').textContent = dangerZones.length;

    document.addEventListener('click', e => {
        if (e.target.dataset.step === 'finish') {
            finishStep();

            if (document.querySelector('.workflow__section-content_current').classList.contains('security-center')) {
                let currentStep = document.querySelector('.workflow__section-content_current');
                let points = [...document.querySelectorAll('.workflow__section-content')];
                let elPos = points.indexOf(currentStep);
                document.querySelectorAll('.desk-tasks__task')[elPos].classList.add('desk-tasks__task_finished');
                if (elPos + 1 != document.querySelectorAll('.workflow__section-content').length) {
                    document.querySelectorAll('.workflow__section-content')[elPos].classList.remove('workflow__section-content_current')
                    document.querySelectorAll('.workflow__section-content')[elPos + 1].classList.add('workflow__section-content_current');
                }
            
                
                if (document.querySelector('.workflow__section-content_current').classList.contains('security-map')) {
                    document.querySelector('.desk-tasks__button').textContent = 'Продолжить';
                    document.querySelector('.desk__wrapper').style.height = "auto";
                }
            } else if (document.querySelector('.workflow__section-content_current').classList.contains('security-map')) {
                let currentStep = document.querySelector('.workflow__section-content_current');
                let points = [...document.querySelectorAll('.workflow__section-content')];
                let elPos = points.indexOf(currentStep);
                if (elPos + 1 != document.querySelectorAll('.workflow__section-content').length) {
                    document.querySelectorAll('.workflow__section-content')[elPos].classList.remove('workflow__section-content_current')
                    document.querySelectorAll('.workflow__section-content')[elPos + 1].classList.add('workflow__section-content_current');
                }
            

                if (document.querySelector('.workflow__section-content_current').classList.contains('security-graph')) {
                    document.querySelector('.desk-tasks__button').style.display = 'none';
                    document.querySelector('.desk__wrapper').style.height = "100%";

                    document.querySelector('.desk').classList.remove('desk_stage2');
                }
            }
        }
        if (e.target.dataset.step === 'incorrect') {
            popupMap.classList.add('_opened');
            window.setTimeout(() => {
                popupMap.classList.add('clickable');
            }, 5);
        }

        if (e.target.classList.contains('security-center__answears-button')) {
            let answears = document.querySelectorAll('.security-center__answears-button');
            answears.forEach(el => {
                el.classList.remove('security-center__answears-button_incorrect');
                el.classList.remove('security-center__answears-button_checked');
            })

            e.target.classList.add('security-center__answears-button_checked')

            document.querySelector('.security-center__answear-complete').classList.remove('security-center__answear-complete_disabled')
        }
        if (e.target.classList.contains('security-center__answear-complete')) {
            let choice = document.querySelector('.security-center__answears-button_checked');
            let points = [...document.querySelectorAll('.security-center__answears-button')]
            let elPos = points.indexOf(choice);
            if (elPos === parseInt(document.querySelector('.security-center__answears').dataset.correct)) {
                choice.classList.add('security-center__answears-button_correct')
                let answears = document.querySelectorAll('.security-center__answears-button');
                answears.forEach(el => {
                    el.style.pointerEvents = 'none';
                });
                document.querySelector('.desk-tasks__button').classList.remove('button_disabled')
                document.querySelector('.desk-tasks__button').classList.add('button_active')
            } else {
                choice.classList.add('security-center__answears-button_incorrect')  
            }
            document.querySelector('.security-center__answear-complete').classList.add('security-center__answear-complete_disabled')
        }

        if (e.target.classList.contains('security-map__circle')) {
            let counterChecked;
            e.target.classList.add('security-map__circle_checked');

            counterChecked = document.querySelectorAll('.security-map__circle_checked');
            document.querySelector('.security-map-counter__current').textContent = counterChecked.length;

            if (counterChecked.length === dangerZones.length) {
                document.querySelector('.security-map-counter').classList.add('security-map-counter_finished');

                let currentStep = document.querySelector('.workflow__section-content_current');
                let points = [...document.querySelectorAll('.workflow__section-content')];
                let elPos = points.indexOf(currentStep);
                document.querySelectorAll('.desk-tasks__task')[elPos].classList.add('desk-tasks__task_finished');
                document.querySelector('.desk-tasks__button').classList.remove('button_disabled')
                document.querySelector('.desk-tasks__button').classList.add('button_active')            
            }
        }
    })

    // for popup
    document.addEventListener('click', e => {
        if (!e.target.closest('.popup_map') && !e.target.closest('.mistake') && popupMap.classList.contains('clickable') && popupMap.classList.contains('_opened')) {
            popupMap.classList.remove('_opened');
            popupMap.classList.remove('clickable');
        }
        if (e.target.closest('.popup__close-btn')) {
            popupMap.classList.remove('_opened');
            popupMap.classList.remove('clickable');
        }
    })
    // for popup
    document.addEventListener('keydown', function(event) {
        if (popupMap.classList.contains('_opened')) {
            if (event.key == 'Escape') {
                popupMap.classList.remove('_opened');
                popupMap.classList.remove('clickable');
            }
        }
    });
})


function finishStep() {
    document.querySelector('.desk-tasks__button').classList.add('button_disabled')
    document.querySelector('.desk-tasks__button').classList.remove('button_active')
}