using System.ComponentModel.DataAnnotations;

namespace API.Model
{
    public class TokenModel
    {
        [Key]
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public string UserId { get; set; }
        public string Permission { get; set; }
        public string Sakhan { get; set; }
    }
}
