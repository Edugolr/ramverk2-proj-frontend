/**
 * Test for getting started with Selenium.
 */
"use strict";

let selenium = require('selenium-webdriver');
let driver = new selenium.Builder()
  .withCapabilities(selenium.Capabilities.chrome())
  .build()


driver.get("https://frontend.chai17.me");

// Two different ways to work with promises
// Way 1
let promise = driver.getTitle();

promise.then(function(title) {
    console.log(title);
});

// Way 2
driver.getTitle().then(function( title ) {
    console.log(title);
});

driver.quit();
