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
test.describe("frontend.chai17.me", function() {
    test.beforeEach(function(done) {
        this.timeout(200000);
        browser = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).build();

        browser.get("https://frontend.chai17.me/#/");
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

    async function login() {
      let h1 = await browser.wait(until.elementLocated(By.css('h1')), 10000);
      let text = await h1.getText();
      assert.equal(text, "Depot")
    }
    async function market() {
      let h1 = await browser.wait(until.elementLocated(By.css('h1')), 10000);
      let text = await h1.getText();
      assert.equal(text, "CardMarket")
    }

    // Test case fungerar !
    test.it("Test index (checks title url and h1 text)", function(done) {
        browser.getTitle().then(function(title) {
            assert.equal(title, "frontend-trading");
        });

        assertCssText("Card Market", "h1");
        matchUrl("#/");

        done();
    });
    //
    //
    // fungerar
    test.it("Test go to login", function(done) {
        // try use nav link
        goToNavLink("Login/Register");
        // assertCssText("Login", "h1");
        matchUrl("user/login" );

        done();
    });
    //
// Fungerar !
    test.it("Test filling out email", function(done) {
        goToNavLink("Login/Register");
        browser.findElement(By.id("emailLogin")).sendKeys("test@email.com");
        browser.findElement(By.id("emailLogin")).getAttribute('value').then(function(value){
            assert.equal(value, "test@email.com");
        })
        done();
    });

//fungerar !!
    test.it("Test filling out password", function(done) {
        goToNavLink("Login/Register");
        browser.findElement(By.id("passwordLogin")).sendKeys("test");
        browser.findElement(By.id("passwordLogin")).getAttribute('value').then(function(value){
            assert.equal(value, "test");
        })
        done();
    });

    test.it("Test filling out login form and submitting (checks the h1 on the redirected depot page)", function(done) {
        goToNavLink("Login/Register");
        browser.findElement(By.id("emailLogin")).sendKeys("test@email.com");
        browser.findElement(By.id("passwordLogin")).sendKeys("test");
        browser.findElement(By.id("submitLogin")).click().then(
            login()
        )
        done();
    });

    test.it("Test filling out login form and submitting then go to market link", function(done) {
        goToNavLink("Login/Register");
        browser.findElement(By.id("emailLogin")).sendKeys("test@email.com");
        browser.findElement(By.id("passwordLogin")).sendKeys("test");
        browser.findElement(By.id("submitLogin")).click().then(
            login(),
            goToNavLink("Market"),
            market()
        )
        done();
    });
});
