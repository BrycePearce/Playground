﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MvcCoreOverview.Models;

namespace MvcCoreOverview.Controllers {
    public class HomeController : Controller {
        // Type IActionResult returns anything web related, e.g. views (html), JSON, redirects. You could also be more specific by replacing IActionResult with ViewResult which is specific to returning views.
        public ViewResult Index() {
            // returns a view from the views folder.
            // if no view name is specified (like now), then asp.net will look for the name of the action (Index()), and serve the view with that same name (Index.cshtml)
            return View();


            // return "something" instead of view, would render an html page that said "something", it is valid. (would have to change ViewResult to type String)
        }

        // Naming this function AnotherAction() will make it look for the view called "AnotherAction.cshtml", and return that view (html)
        public IActionResult AnotherAction() {
            return View(); // this view is the view with the name of the method, aka AnotherAction.cshtml
        }

        // return a view with a different name
        public IActionResult AnotherView() {
            return View("SomeView");
        }
        // passing a value to the view (not the best practice way)
        public IActionResult ViewWithParameter() {
            string someString = "I am a string";
            return View("ViewWithParameter", someString);
        }
        // passing a value to the view, with ViewBag, TempData, and ViewData(still not best practice, but better. Best practice is to use ViewModel)
        public IActionResult PassingData() {
            // Viewbag allows us to send data to the razor frontend, http://www.tutorialsteacher.com/mvc/viewbag-in-asp.net-mvc
            ViewBag.fruit = "Apples";
            ViewData["Color"] = "Red";
            // Tempdata will survive a redirect
            TempData["Number"] = 5;

            return View("ViewWithParameter");
        }

        public IActionResult About() {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact() {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error() {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
