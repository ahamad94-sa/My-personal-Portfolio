// script.js
// Shared interactions: smooth scrolling, active nav link, back-to-top button, reveal animations,
// and basic contact form validation (front-end only).

$(document).ready(function () {
  /* =====================================
     Set Current Year in Footer
     ===================================== */
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* =====================================
     Highlight Active Navigation Link
     Based on current page URL
     ===================================== */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  $(".main-nav .nav-link").each(function () {
    const href = $(this).attr("href");
    if (href === currentPage) {
      $(this).addClass("active");
    }
  });

  /* =====================================
     Smooth Scroll for Same-page Anchors
     (e.g., #about, #contact-preview)
     ===================================== */
  $('a[href^="#"]').on("click", function (e) {
    const targetId = $(this).attr("href");
    const $target = $(targetId);

    if ($target.length) {
      e.preventDefault();
      $("html, body").animate(
        {
          scrollTop: $target.offset().top - 80, // offset for sticky header
        },
        600
      );
    }
  });

  /* =====================================
     Back to Top Button
     ===================================== */
  const $backToTop = $("#backToTop");

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 200) {
      $backToTop.addClass("show");
    } else {
      $backToTop.removeClass("show");
    }

    // Trigger reveal animation on scroll
    handleReveal();
  });

  $backToTop.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
  });

  /* =====================================
     Reveal on Scroll Animations
     ===================================== */
  function handleReveal() {
    const revealElements = document.querySelectorAll(".reveal");
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerBottom) {
        el.classList.add("active");
      }
    });
  }

  // Run once on load
  handleReveal();

  /* =====================================
     Contact Form Validation (Front-end Only)
     ===================================== */
  const $contactForm = $("#contactForm");
  if ($contactForm.length) {
    $contactForm.on("submit", function (e) {
      e.preventDefault();

      let isValid = true;
      const nameInput = $("#name");
      const emailInput = $("#email");
      const messageInput = $("#message");
      const successEl = $("#formSuccess");

      // Helper function to validate fields
      function setFieldState($input, isValidField, message) {
        const $group = $input.closest(".form-group");
        const $error = $group.find(".error-message");

        if (!isValidField) {
          $group.addClass("invalid");
          $error.text(message || "This field is required");
        } else {
          $group.removeClass("invalid");
          $error.text("");
        }
      }

      // Name validation
      const nameVal = nameInput.val().trim();
      if (!nameVal) {
        isValid = false;
        setFieldState(nameInput, false, "Please enter your name.");
      } else {
        setFieldState(nameInput, true, "");
      }

      // Email validation (basic pattern)
      const emailVal = emailInput.val().trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal) {
        isValid = false;
        setFieldState(emailInput, false, "Please enter your email.");
      } else if (!emailPattern.test(emailVal)) {
        isValid = false;
        setFieldState(emailInput, false, "Please enter a valid email address.");
      } else {
        setFieldState(emailInput, true, "");
      }

      // Message validation
      const messageVal = messageInput.val().trim();
      if (!messageVal) {
        isValid = false;
        setFieldState(messageInput, false, "Please enter your message.");
      } else if (messageVal.length < 10) {
        isValid = false;
        setFieldState(
          messageInput,
          false,
          "Message should be at least 10 characters long."
        );
      } else {
        setFieldState(messageInput, true, "");
      }

      // If valid, show success message (demo only)
      if (isValid) {
        if (successEl.length) {
          successEl.text(
            "Thank you! Your message has passed validation (front-end demo only)."
          );
        }
        // Reset fields
        nameInput.val("");
        emailInput.val("");
        messageInput.val("");
      } else {
        if (successEl.length) {
          successEl.text("");
        }
      }
    });
  }
});
