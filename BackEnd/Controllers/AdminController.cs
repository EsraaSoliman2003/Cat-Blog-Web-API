using Microsoft.AspNetCore.Mvc;
using CatBlog.Data;
using CatBlog.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace CatBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly CatBlogContext _context;
        private readonly IConfiguration _config;

        public AdminController(CatBlogContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // ✅ Login (Admin only)
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginViewModel model)
        {
            var admin = _context.Admins.FirstOrDefault(a => a.Username == model.Username && a.Password == model.Password);
            if (admin == null)
                return Unauthorized(new { Error = "Invalid credentials" });

            var token = GenerateJwtToken(admin);
            return Ok(token);
        }

        // ✅ Create Post
        [HttpPost("create")]
        [Authorize]
        public IActionResult Create([FromBody] Post post)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            post.CreatedAt = DateTime.Now;
            _context.Posts.Add(post);
            _context.SaveChanges();
            return Ok(post);
        }

        // ✅ Edit Post
        [HttpPut("edit/{id}")]
        [Authorize]
        public IActionResult Edit(int id, [FromBody] Post post)
        {
            if (id != post.Id) return BadRequest(new { Error = "ID mismatch" });

            var existing = _context.Posts.FirstOrDefault(p => p.Id == id);
            if (existing == null) return NotFound();

            existing.Title = post.Title;
            existing.Content = post.Content;
            existing.ImageUrl = post.ImageUrl;

            _context.SaveChanges();
            return Ok(existing);
        }

        // ✅ Delete Post
        [HttpDelete("delete/{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            var post = _context.Posts.FirstOrDefault(p => p.Id == id);
            if (post == null) return NotFound();

            _context.Posts.Remove(post);
            _context.SaveChanges();
            return NoContent();
        }

        // 🔑 Helper: Generate JWT
        private object GenerateJwtToken(Admin admin)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, admin.Username),
                new Claim(ClaimTypes.NameIdentifier, admin.Id.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expires = DateTime.Now.AddMinutes(30);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            return new
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                ExpiresAt = expires
            };
        }
    }
}
