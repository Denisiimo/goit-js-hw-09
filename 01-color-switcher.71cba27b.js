!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");e.disabled=!0,t.addEventListener("click",(function(){background=setInterval((function(){document.body.style.backgroundColor="".concat("#".concat(Math.floor(16777215*Math.random()).toString(16)))}),1e3),t.disabled=!0,e.disabled=!1})),e.addEventListener("click",(function(){clearInterval(background),e.disabled=!0,t.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.71cba27b.js.map