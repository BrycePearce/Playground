﻿using CityInfo.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CityInfo.Controllers {
    [Route("api/cities")]
    public class PointsOfInterestController : Controller {
        [HttpGet("{cityId}/pointsofinterest")]
        public IActionResult GetPointsOfInterest(int cityId) {
            // try and find the city
            var city = CitiesDataStore.Current.Cities.FirstOrDefault(c => c.Id == cityId);

            if (city == null) {
                return NotFound();
            }
            return Ok(city.PointsOfInterest);
        }

        [HttpGet("{cityId}/pointsofinterest/{id}", Name = "GetPointOfInterest")]
        public IActionResult GetPointOfInterest(int cityId, int id) {
            var city = CitiesDataStore.Current.Cities.FirstOrDefault(c => c.Id == cityId);

            if (city == null) {
                return NotFound();
            }

            var pointOfInterest = city.PointsOfInterest.FirstOrDefault(p => p.Id == id);

            if (pointOfInterest == null) {
                return NotFound();
            }

            return Ok(pointOfInterest);
        }
        // add a new point of interest for a city
        [HttpPost("{cityId}/pointsofinterest")]
        public IActionResult CreatPointOfInterest(int cityId,
            [FromBody] PointOfInterestForCreationDto pointOfInterest) {
            // Error: Bad request
            if (pointOfInterest == null) {
                return BadRequest();
            }
            // ---
            // Error: Trying to add a point of interest to a city that does not exist
            var city = CitiesDataStore.Current.Cities.FirstOrDefault(c => c.Id == cityId);

            if (city == null) {
                return NotFound();
            }
            // ---
            // Bad Practice, will be improved: Calculate the number of cities we have by looping through all of them and finding the one with the highest Id
            var maxPointOfInterestId = CitiesDataStore.Current.Cities.SelectMany(
                c => c.PointsOfInterest).Max(p => p.Id);
            
            // Create the new point of interest object
            var finalPointOfInterest = new PointOfInterestDto() {
                Id = ++maxPointOfInterestId, // add one more to the current value, which we will use for the new point of interest
                Name = pointOfInterest.Name,
                Description = pointOfInterest.Description
            };

            // add the new point of interest
            city.PointsOfInterest.Add(finalPointOfInterest);

            // return our status code CreatedAtRoute which requires route(city) value, and the created object value (finalPointOfInterest)
            // note: getpoint ofinterest refers to the id that was sent in the GET route
            return CreatedAtRoute("GetPointOfInterest", new { cityId = cityId, id = finalPointOfInterest.Id }, finalPointOfInterest);
        }
    }
}
