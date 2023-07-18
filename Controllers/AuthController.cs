using System;
using System.Threading.Tasks;
using API.DBContext;
using API.Interface;
using API.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IJWTManagerService _jWTManager;
        private readonly ICommonService<TokenModel> _tokenService;
        public AuthController(IJWTManagerService jWTManager, ICommonService<TokenModel> tokenService)
        {
            this._jWTManager = jWTManager;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login(User data)
        {
            try
            {
                var result = await _jWTManager.Authenticate(data);
                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                var error = ex;
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

    }
}
