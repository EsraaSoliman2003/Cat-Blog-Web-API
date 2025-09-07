using System.ComponentModel.DataAnnotations;

namespace CatBlog.Models
{
    public class Admin
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Username is required")]
        [StringLength(100)]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(100)]
        public string Password { get; set; }
    }
}
