/**
 * Test for getting started with Selenium.
 */
"use strict";



const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const By = webdriver.By;
const until = webdriver.until;
let browser;


// Does not work with WSL!! Use cygwin



// Test suite
test.describe("vue.chai17.me", function() {
    test.beforeEach(function(done) {
        this.timeout(200000);
        browser = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).build();

        browser.get("https://vue.chai17.me/#/");
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });


    function goToNavLink(target) {
        browser.findElement(By.linkText(target)).then(function(element) {
            element.click();
        });
    }

    function matchUrl(target) {
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith(target));
        });
    }

    function assertCssText(target, elementCss) {
        browser.findElement(By.css(elementCss)).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, target);
            });
        });
    }

    async function h2TextCreateReport() {
      let h2 = await browser.wait(until.elementLocated(By.css('h2')), 10000);
      let text = await h2.getText();
      assert.equal(text, "Create Report")
}

    // Test case
    test.it("Test index (checks title url and h2 text)", function(done) {
        let promise = browser.getTitle();

        promise.then(function(title) {
            assert.equal(title, "vue");
        });

        browser.getTitle().then(function(title) {
            assert.equal(title, "vue");
        });

        assertCssText("OM", "h2");
        matchUrl("#/");

        done();
    });
    //
    //
    //
    // test.it("Test go to login", function(done) {
    //     // try use nav link
    //     goToNavLink("Login");
    //     assertCssText("Login", "h1");
    //     matchUrl("#/login" );
    //
    //     done();
    // });
    //
    test.it("Test go to kmom01 (checks url and h2 text)", function(done) {
        // try use nav link
        goToNavLink("kmom01");
        assertCssText("KMOM01", "h2");
        matchUrl("#/report/kmom01" );

        done();
    });
    //
    // test.it("Test go to login", function(done) {
    //     // try use nav link
    //     goToNavLink("Login");
    //     assertCssText("Login", "h1");
    //     matchUrl("#/login" );
    //
    //     done();
    // });
    // test.it("Test filling out username", function(done) {
    //     goToNavLink("Login");
    //     browser.findElement(By.id("username")).sendKeys("christofer.wikman2@gmail.com");
    //     browser.findElement(By.id("username")).getAttribute('value').then(function(value){
    //         assert.equal(value, "christofer.wikman2@gmail.com");
    //     })
    //     done();
    // });
    //
    // test.it("Test filling out password", function(done) {
    //     goToNavLink("Login");
    //     browser.findElement(By.id("password")).sendKeys("testar");
    //     browser.findElement(By.id("password")).getAttribute('value').then(function(value){
    //         assert.equal(value, "testar");
    //     })
    //     done();
    // });

    test.it("Test filling out login form and submitting (checks the h2 on Create Report page redirect)", function(done) {
        goToNavLink("Login");
        browser.findElement(By.id("username")).sendKeys("christofer.wikman2@gmail.com");
        browser.findElement(By.id("password")).sendKeys("testar");
        browser.findElement(By.id("submit")).click().then(
            h2TextCreateReport()
        )
        done();
    });



    // test.it("Test go to Calculator", function(done) {
    //     goToNavLink("Calculator");
    //
    //     // get h1 text
    //     assertH1("Calculator");
    //     matchUrl("#!/calculator");
    //
    //     done();
    // });
    //
    //
    //
    // test.it("Test color on Calculator", function(done) {
    //     goToNavLink("Calculator");
    //
    //     // display element background color
    //     browser.findElement(By.id("display")).then(function(displayElement) {
    //         displayElement.getCssValue("background-color").then(function(bgColor) {
    //             assert.equal(bgColor, "rgb(221, 221, 221)");
    //         });
    //     });
    //
    //     // operator buttons background color
    //     browser.findElements(By.className("operator")).then(function(operatorElements) {
    //         webdriver.promise.map(operatorElements, function(element) {
    //             return element.getCssValue('background-color');
    //         }).then(function(colors) {
    //             colors.forEach(function(color) {
    //                 assert.equal(color, "rgb(0, 31, 63)");
    //             });
    //         });
    //     });
    //
    //     done();
    // });
    //
    //
    //
    // test.it("Test an addition calculation", function(done) {
    //     goToNavLink("Calculator");
    //
    //     let promiseNumbers = browser.findElements(By.className("number"));
    //
    //     promiseNumbers.then(function(numberElements) {
    //         // press number 1
    //         numberElements[6].click();
    //         // press +
    //         browser.findElements(By.className("operator")).then(function(operatorElements) {
    //             operatorElements[3].click();
    //             // press number 5
    //             numberElements[4].click();
    //             // press =
    //             operatorElements[4].click();
    //         });
    //     });
    //
    //     // check sum
    //     browser.findElement(By.id("display")).then(function(displayElement) {
    //         displayElement.getText().then(function(value) {
    //             assert.equal(value, "6");
    //         });
    //     });
    //
    //     done();
    // });
});
