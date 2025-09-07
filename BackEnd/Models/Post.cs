using System;
using System.ComponentModel.DataAnnotations;

namespace CatBlog.Models
{
    public class Post
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Please enter a title")]
        [StringLength(200)]
        public string Title { get; set; }

        [Required(ErrorMessage = "Please enter the content")]
        public string Content { get; set; }

        [Display(Name = "Image URL")]
        public string ImageUrl { get; set; }

        [Display(Name = "Created At")]
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
