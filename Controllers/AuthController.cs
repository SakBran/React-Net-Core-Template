using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        // private readonly ApplicationDbContext _context;
        // private readonly IConfiguration _iconfiguration;
        // private readonly IJWTManagerService _jWTManager;
        // private readonly IMapper _mapper;
        // public AuthController(ApplicationDbContext context, IConfiguration iconfiguration, IJWTManagerService jWTManager, IMapper mapper)
        // {
        //     _context = context;
        //     _iconfiguration = iconfiguration;
        //     _mapper = mapper;
        //     this._jWTManager = jWTManager;
        // }

        //     [AllowAnonymous]
        //     [HttpPost]
        //     [Route("Login")]
        //     public async Task<User> Login(User data)
        //     {
        //         var response = new User();

        //         try
        //         {
        //             var token = _jWTManager.AuthenticateTradenet2(response.data.htathaka_no);
        //             response.Token = token.Token;
        //             response.Permission = token.Permission;
        //             return response;
        //         }
        //         catch (Exception ex)
        //         {
        //             var error = ex;
        //             return response;
        //         }
        //     }
        // 
    }
}
