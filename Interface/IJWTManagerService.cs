using API.Model;

namespace API.Interface
{
    public interface IJWTManagerService
    {
        TokenModel? Authenticate(User users);
        //TokenModel AuthenticateInspector(User users);
        TokenModel? RefreshToken(string RefreshToken);
        TokenModel? AuthenticateTradenet2(String users);

    }
}
