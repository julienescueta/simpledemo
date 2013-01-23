/** 
 Use case: Guest user visits the site and registers
 
 1- visit the home page
 2- click on the register button
 3- fill out the registration form
 4- click the register button
 5- assert that the user's name shows up on their profile
 
 */

casper.options.pageSettings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11';

casper.start();

casper.then(function openHome() {
  casper.open('http://localhost:888/');
});

casper.then(function clickOnRegisterButton() {
  casper.click('.component-user-registration a.btn-resaas');
});

casper.then(function assertRegistrationPage() {
  casper.test.assertEquals(casper.getCurrentUrl(), 'http://localhost:888/signup', 'Verify that clicking on the register button takes us to /signup');
});

casper.then(function fillRegistrationForm() {
  casper.fill('#aspnetForm', {
    "firstName": "Lolcat",
    "lastName": "Ismyfiend",
    "email": "LolcatIsmyfiend@meetup.com",
    "password": "meetup",
    "confirmPassword": "meetup"
  }, false);
});

casper.then(function clickRegisterButton() {
  casper.click('a.btn-register');
});

casper.then(function waitForWebServices() {
  casper.waitForResource('http://localhost:888/Services/AuthService.svc/json/SignUp');
  casper.waitForResource('http://localhost:888/Services/UserInfoService.svc/json/getUserInfo');
  casper.waitForResource('http://localhost:888/Services/TrackingService.svc/json/SaveSignUpTrackingDetails');
  casper.waitForResource('http://localhost:888/Services/MainService.svc/json/GetNotificationsForUser');
  casper.waitForResource('http://localhost:888/Services/QuestionAnswerService.svc/json/GetLatestQuestionsBefore');
  casper.waitForResource('http://localhost:888/Services/MainService.svc/json/SearchReblast');
  casper.waitForResource('http://localhost:888/Services/ListingService.svc/json/SearchListing');
});

var name;
casper.then(function getName() {
  name = casper.evaluate(function getNameFromDom() {
    return jQuery('div.user-name-bar').text().trim();
  });
});

casper.then(function assertProfilePage() {
  casper.test.assertEquals(name, 'Lolcat Ismyfiend');
});

casper.run(function runTest() {
  casper.test.done();
});