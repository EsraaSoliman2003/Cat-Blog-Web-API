using Microsoft.AspNetCore.Mvc;
using CatBlog.Data;
using CatBlog.Models;
using System.Linq;

namespace CatBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly CatBlogContext _context;

        public HomeController(CatBlogContext context)
        {
            _context = context;
        }

        // GET: api/Home
        [HttpGet]
        public IActionResult Index()
        {
            var posts = _context.Posts.OrderByDescending(p => p.CreatedAt).ToList();
            return Ok(posts);
        }

        // GET: api/Home/5
        [HttpGet("{id}")]
        public IActionResult Details(int id)
        {
            var post = _context.Posts.FirstOrDefault(p => p.Id == id);
            if (post == null)
                return NotFound();
            return Ok(post);
        }
    }
}