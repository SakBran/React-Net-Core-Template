using System.ComponentModel.DataAnnotations;

namespace API.Model
{
    public class User
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Permission { get; set; }
        public string Sakhan { get; set; }
    }
}
