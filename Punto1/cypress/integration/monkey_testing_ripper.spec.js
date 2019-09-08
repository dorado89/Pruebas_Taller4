describe('Los estudiantes under monkeys', function () {
    it('visits los estudiantes and survives monkeys', function () {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        randomClick(10);
        randomEvent(10);
    });
});
function randomClick(monkeysLeft) {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    var monkeysLeft = monkeysLeft;
    if (monkeysLeft > 0) {
        cy.get('a').then($links => {
            var randomLink = $links.get(getRandomInt(0, $links.length));
            if (!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({force: true});
                monkeysLeft = monkeysLeft - 1;
            }
            cy.wait(1000);
            randomClick(monkeysLeft);
        });
    }
}
function randomEvent(numberEvents) {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    var monkeysLeft = numberEvents;
    if (monkeysLeft > 0) {
        var randomNumber = getRandomInt(1, 4);
        if (randomNumber === 1)
        {
            cy.get('div').then($links => {
                var randomLink = $links.get(getRandomInt(0, $links.length));
                if (!Cypress.dom.isHidden(randomLink)) {
                    cy.wrap(randomLink).click(randomLink.clientWidth, randomLink.clientHeight, {force: true});
                }
                monkeysLeft = monkeysLeft - 1;
                cy.wait(1000);
                randomEvent(monkeysLeft);
            });
        } else if (randomNumber === 2) {
            cy.get('input[type!="checkbox"]').then($links => {
                var randomLink = $links.get(getRandomInt(0, $links.length));
                cy.wrap(randomLink).click({force: true}).type("12345678", {force: true});
                monkeysLeft = monkeysLeft - 1;
                cy.wait(1000);
                randomEvent(monkeysLeft);
            });
        } else if (randomNumber === 3) {
            cy.get('body').then(($body) => {
                if ($body.find('select').length) {
                    cy.get('select > option')
                            .eq(1)
                            .then(element => cy.get('select').select(element.val(), {force: true}))
                    monkeysLeft = monkeysLeft - 1;
                }
            })

            cy.wait(1000);
            randomEvent(monkeysLeft);
        } else if (randomNumber === 4) {
            cy.get('.btn').then($links => {
                var randomLink = $links.get(getRandomInt(0, $links.length));
                if (!Cypress.dom.isHidden(randomLink)) {
                    cy.wrap(randomLink).click({force: true});
                    monkeysLeft = monkeysLeft - 1;
                }
                cy.wait(1000);
                randomEvent(monkeysLeft);
            });
        }
    }
}