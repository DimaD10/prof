

window.addEventListener('load', () => {
    const devices = document.querySelectorAll('.device-manage');
    let devicesCount = devices.length;

    document.querySelectorAll('.devices-counter').forEach(el => {
        el.textContent = devicesCount;
    })
    checkProtect(devicesCount);

    document.addEventListener('click', e => {
        if (e.target.dataset.step === 'finish') {
            finishStep();
        }
    
        // для первого шага
        if (e.target.classList.contains('safety-protocol__button')) {
            e.target.classList.remove('button_active');
            e.target.classList.add('button_disabled');
    
            e.target.textContent = 'Защита установлена';
    
            document.querySelector('.safety-report__field_state .safety-report__report').classList.remove('safety-report__report_warn');
            document.querySelector('.safety-report__field_state .safety-report__report').classList.add('safety-report__report_safe');

            document.getElementById('controled-by-protocol').classList.add('device-manage_safe');

            checkProtect(devicesCount);
        }

        if (e.target.classList.contains('device-manage__active-btn')) {
            let parent = e.target.closest('.device-manage');
            activateProtection(parent, devicesCount)
        }
    })
})

function finishStep() {
    let currentStep = document.querySelector('.todo-steps__step_current');

    currentStep.classList.add('todo-steps__step_finished');
    let points = [...document.querySelectorAll('.todo-steps__step_active')]
    let elPos = points.indexOf(currentStep);
    document.querySelectorAll('.desk-tasks__task')[elPos].classList.add('desk-tasks__task_finished');
}

function activateProtection(parent, devicesCount) {
    parent.classList.add('device-manage_safe');
    checkProtect(devicesCount);
    parent.querySelector('.device-manage__active-btn').textContent = 'Защита активирована'
}

function checkProtect(devicesCount) {
    let protectedDevices = document.querySelectorAll('.device-manage_safe');
    let counterProtectedDevices = document.querySelectorAll('.devices-manage__safe-devices');
    counterProtectedDevices.forEach(el => {
        el.textContent = protectedDevices.length;
    })
    document.getElementById('manage-counter').textContent = devicesCount - protectedDevices.length;

    if (protectedDevices.length === devicesCount) {
        document.querySelector(".safety-manage").classList.remove('safety-report__report_warn');
        document.querySelector(".safety-manage").classList.add('safety-report__report_safe');

        finishStep()
    }
}