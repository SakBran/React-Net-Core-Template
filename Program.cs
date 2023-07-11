using API.DBContext;
using API.Interface;
using API.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddSpaStaticFiles(configuration =>
        {
            configuration.RootPath = "ClientApp/dist";
        });

        builder.Services.AddDbContextPool<ApplicationDbContext>(options =>
        options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

        builder.Services.AddAuthentication(x =>
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(o =>
        {
            var Key = Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]);
            o.SaveToken = true;
            o.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration["JWT:Issuer"],
                ValidAudience = builder.Configuration["JWT:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Key)
            };
        });
        builder.Services.AddScoped<IJWTManagerService, JWTManagerService>();
        builder.Services.AddScoped(typeof(ICommonService<>), typeof(CommonService<>));

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseDeveloperExceptionPage();
            app.UseSwaggerUI();
        }
        else {
            app.UseDeveloperExceptionPage();
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        #region Cors
        app.UseCors(
                      builder =>
                      {
                          builder.WithMethods("GET");
                          builder.WithMethods("PUT");
                          builder.WithMethods("POST");
                          builder.WithMethods("DELETE");
                          builder.WithMethods("*");
                          builder.WithHeaders("AuthoriZatioN");
                          builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
                          //Code capacitor://localhost for ios device 
                          //http://localhost for android device
                          //An origin is the combination of the protocol, domain, 
                          //and port from which your Ionic app or the external resource is served. 
                          //For example, apps running in 
                          //Capacitor have capacitor://localhost (iOS) or http://localhost (Android) as their origin. 
                          builder.WithOrigins(
                          "https://vehicle.myanmartradenet.com",
                          "https://testingvehicle.myanmartradenet.com",
                          "https://www.mpu-ecommerce.com",
                          "https://www.mpuecomuat.com",
                          "capacitor://localhost",
                          "http://localhost",
                          "http://localhost/",
                          "https://localhost",
                          "https://localhost/",
                          "http://localhost:*",
                          "http://localhost:8100",
                          "http://localhost:8100/").AllowAnyMethod().AllowAnyHeader().AllowCredentials();

                      }
                  );
        #endregion
        app.UseStaticFiles(new StaticFileOptions()
        {
            OnPrepareResponse = (context) =>
            {
                switch (context.File.Name)
                {
                    // disable caching for these specific files
                    case "isOnline.txt":
                        context.Context.Response.Headers.Add("Cache-Control", "no-cache, no-store");
                        context.Context.Response.Headers.Add("Expires", "-1");
                        break;
                    // use default rules (from appsettings.json) for all other files
                    default:
                        context.Context.Response.Headers["Cache-Control"] =
                            builder.Configuration["StaticFiles:Headers:Cache-Control"];
                        break;
                }
            }
        });

        if (!builder.Environment.IsDevelopment())
        {
            app.UseSpaStaticFiles();
        }
        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseForwardedHeaders(new ForwardedHeadersOptions
        {
            ForwardedHeaders = ForwardedHeaders.XForwardedFor
            | ForwardedHeaders.XForwardedProto
        });
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action=Index}/{id?}");


        });
        app.UseSpa(spa =>
        {
            // To learn more about options for serving an Angular SPA from ASP.NET Core,
            // see https://go.microsoft.com/fwlink/?linkid=864501

            spa.Options.SourcePath = "ClientApp";

            if (builder.Environment.IsDevelopment())
            {
                spa.UseReactDevelopmentServer("start");
            }
            spa.ApplicationBuilder.UseCors(builder =>
            {
                // Must specify Methods
                builder.WithMethods("GET");
                builder.WithMethods("PUT");
                builder.WithMethods("POST");
                builder.WithMethods("DELETE");
                builder.WithMethods("*");
                builder.WithHeaders("Authorization");
                builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
                builder.WithOrigins("*", "http://localhost:8101/").AllowAnyMethod().AllowAnyHeader().AllowCredentials();

            });

        });

        app.MapControllers();
        app.Run();
    }
}