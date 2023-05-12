// moved to utils

// let loadNewsletter = document.addEventListener("DOMContentLoaded", function() {

//   const newsletterButton = document.getElementById("newsletter-button");
//   const newsletterModal = document.getElementById("newsletter-modal");
//   const closeButton = document.getElementsByClassName("close")[0];
//   const form = document.getElementById("newsletter-form");
//   const thankYou = document.getElementById("thank-you");
  
//   newsletterButton.addEventListener("click", function () {
//     newsletterModal.style.display = "block";
//   });
  
//   closeButton.addEventListener("click", function () {
//     newsletterModal.style.display = "none";
//   });
  
//   window.addEventListener("click", function (event) {
//     if (event.target == newsletterModal) {
//       newsletterModal.style.display = "none";
//     }
//   });
  
//   form.addEventListener("submit", function (event) {
//     event.preventDefault();
//     const fname = document.getElementById("news-fname").value;
//     document.getElementById(
//       "thank-you"
//     ).innerHTML = `Thank you for subscribing, ${fname}!`;
//     thankYou.style.display = "block";
//   });
// });