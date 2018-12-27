using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace pwademoapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly DataContext _dbContext;
        public PersonController(DataContext dbContext)
        {
            this._dbContext = dbContext;
        }

        // GET api/person
        [HttpGet]
        public IActionResult Get()
        {
            var dbData = _dbContext.Person.ToList();
            return Ok(dbData);
        }

        // GET api/person/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_dbContext.Person.Where(x => x.Id == id).FirstOrDefault());
        }

        // POST api/person
        [HttpPost]
        public IActionResult Post([FromBody] Person model)
        {
            _dbContext.Person.Add(model);
            _dbContext.SaveChanges();
            return Ok();
        }

        // PUT api/person/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Person model)
        {
            var dbPerson = _dbContext.Person.Where(x => x.Id == id).FirstOrDefault();
            if (dbPerson == null)
                return NotFound();
            dbPerson.Name = model.Name;
            dbPerson.Address = model.Address;
            dbPerson.PhoneNumber = model.PhoneNumber;
            _dbContext.Entry(dbPerson).State = EntityState.Modified;
            _dbContext.SaveChanges();

            return Ok();
        }

        // DELETE api/person/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var dbPerson = _dbContext.Person.Where(x => x.Id == id).FirstOrDefault();
            if (dbPerson == null)
                return NotFound();
            
            _dbContext.Person.Remove(dbPerson);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}
