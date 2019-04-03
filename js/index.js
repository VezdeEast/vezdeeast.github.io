(function() {
    // let moneyCurrent = parseInt(document.getElementById('money-current').getAttribute('data-value'));
    // let moneyGoal = parseInt(document.getElementById('money-goal').getAttribute('data-value'));
    // let percentage = moneyCurrent / moneyGoal * 100;

    // let moneyProgress = document.getElementById('money-progress');
    // moneyProgress.style.width = percentage + '%';

    let timerDays = document.getElementById('timer-days');
    let timerHours = document.getElementById('timer-hours');
    let timerMinutes = document.getElementById('timer-minutes');
    let timerSeconds = document.getElementById('timer-seconds');

    let days = parseInt(timerDays.innerText);
    let hours = parseInt(timerHours.innerText);
    let minutes = parseInt(timerMinutes.innerText);
    let seconds = parseInt(timerSeconds.innerText);

    setInterval(function() {
        if (--seconds < 0) {
            minutes--;
            seconds = 59;
        }
        if (minutes < 0) {
            minutes = 59;
            hours--;
        }
        if (hours < 0) {
            hours = 24;
            days--;
        }

        Array.prototype.forEach.call(document.getElementsByClassName('timer-days'), function (item) {
            item.innerText = days;
        });
        Array.prototype.forEach.call(document.getElementsByClassName('timer-hours'), function (item) {
            item.innerText = hours;
        });
        Array.prototype.forEach.call(document.getElementsByClassName('timer-minutes'), function (item) {
            item.innerText = minutes;
        });
        Array.prototype.forEach.call(document.getElementsByClassName('timer-seconds'), function (item) {
            item.innerText = seconds;
        });
        timerDays.innerText = days;
        timerHours.innerText = hours;
        timerMinutes.innerText = minutes;
        timerSeconds.innerText = seconds;
    }, 1000);

    // let addSubscriberBtn = document.getElementById('add-sub');
    // addSubscriberBtn.addEventListener('click', function (e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     addSubscriber(document.getElementById('sub-email'));
    // });

    let formSubscribe = document.getElementsByClassName('subscribe-form');
    [].forEach.call(formSubscribe, function (item) {
        item.addEventListener('submit', function(e) {
            let captchaResponse = grecaptcha.getResponse();
            if (captchaResponse.length !== 0) {
                let emailInput = document.getElementById('sub-email');
                addSubscriber(emailInput, function () {
                    closeModal('modal-subscribe');
                    document.getElementById('subscribe-success-form').style.display = 'inherit';
                    document.getElementById('subscribe-form').style.display = 'none';
                });
            } else {
                alert('Captcha is not correct');
            }
            grecaptcha.reset();
            e.preventDefault();
            e.stopPropagation();
        });
    });

    function addSubscriber(emailInput, callback) {
        let email = emailInput.value;

        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/subscriber/add', true);

        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send('email=' + email);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                let result = JSON.parse(xhr.responseText);
                if (result.status) {
                    if (typeof callback !== typeof undefined) {
                        callback();
                    }
                } else {
                    let errors = '';
                    Object.keys(result.data).map(function (key, item) {
                        [].forEach.call(result.data[key], function (error) {
                            errors += error;
                        });
                    });
                    alert(errors);
                }
            } else if (xhr.status !== 200) {
                alert('Server error! Try again');
            }
        };
    }
})();
