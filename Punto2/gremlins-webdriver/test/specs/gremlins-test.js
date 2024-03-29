function loadScript(callback) {
    var s = document.createElement('script');
    s.src = 'https://rawgithub.com/marmelab/gremlins.js/master/gremlins.min.js';
    if (s.addEventListener) {
        s.addEventListener('load', callback, false);
    } else if (s.readyState) {
        s.onreadystatechange = callback;
    }
    document.body.appendChild(s);
}

function unleashGremlins(ttl, callback) {
    function stop() {
        horde.stop();
        callback();
    }
    var notDisabledFormGremblin = gremlins.species.formFiller().canFillElement(function (element) {
        return !element.hasAttribute("disabled");
    });
    var clicksOnButtonsLinksGremblin = gremlins.species.clicker().clickTypes(['click']).canClick(function (element) {
        if (element.tagName === "A" || element.tagName === "BUTTON") {
            return true;
        }
        return false;
    });
    var horde = window.gremlins.createHorde().gremlin(notDisabledFormGremblin).gremlin(clicksOnButtonsLinksGremblin);
    horde.seed(1234);
horde.strategy(gremlins.strategies.distribution()
  .distribution([0.3, 0.7])
);
    horde.after(callback);
    window.onbeforeunload = stop;
    setTimeout(stop, ttl);
    horde.unleash();
}

describe('Monkey testing with gremlins ', function () {

    it('it should not raise any error', function () {
        browser.url('/');
        browser.click('button=Cerrar');

        browser.timeoutsAsyncScript(60000);
        browser.executeAsync(loadScript);

        browser.timeoutsAsyncScript(60000);
        browser.executeAsync(unleashGremlins, 50000);
    });

    afterAll(function () {
        browser.log('browser').value.forEach(function (log) {
            browser.logger.info(log.message.split(' ')[2]);
        });
    });

});