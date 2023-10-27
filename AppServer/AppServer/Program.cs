using AppServer.Entities;
using AppServer.Helpers;
using AppServer.Helpers.Interfaces;
using AppServer.Middlewares;
using AppServer.Services;
using AppServer.Services.Interfaces;
using AppServer.Static;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Configure cors policy

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AppClientDev",
        policy =>
        {
            policy.AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()
            .WithOrigins(builder.Configuration["FrontendAppUrl"]);
        });
});

// Configure EntityFramework with SQL Server

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Configure Identity

builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireDigit = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 8;
    options.User.RequireUniqueEmail = true;
}).AddEntityFrameworkStores<AppDbContext>().AddDefaultTokenProviders();

// Authentication token setup

var authenticationSettings = new AuthenticationSettings();
builder.Configuration.GetSection("Authentication").Bind(authenticationSettings);
builder.Services.AddSingleton(authenticationSettings);

builder.Services.AddAuthentication(option =>
{
    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(config =>
{
    config.RequireHttpsMetadata = false;
    config.SaveToken = true;
    config.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidIssuer = authenticationSettings.JwtIssuer,
        ValidateAudience = true,
        ValidAudience = authenticationSettings.JwtAudience,
        RequireExpirationTime = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationSettings.JwtSecret)),
        ValidateIssuerSigningKey = true,

        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero,
    };
});

var mailSettings = new MailSettings();
builder.Configuration.GetSection("MailSettings").Bind(mailSettings);
builder.Services.AddSingleton(mailSettings);

builder.Services.AddControllers();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IJwtAuthManager, JwtAuthManager>();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddScoped<ErrorHandlingMiddleware>();
builder.Services.AddTransient<IMailManager, MailManager>();

var app = builder.Build();

// Seed roles

using var scope = app.Services.CreateScope();
var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

if (!roleManager.RoleExistsAsync(UserRoles.Admin).GetAwaiter().GetResult())
{
    roleManager.CreateAsync(new IdentityRole(UserRoles.Admin)).GetAwaiter().GetResult();
}
if (!roleManager.RoleExistsAsync(UserRoles.User).GetAwaiter().GetResult())
{
    roleManager.CreateAsync(new IdentityRole(UserRoles.User)).GetAwaiter().GetResult();
}

// Configure the HTTP request pipeline.

app.UseMiddleware<ErrorHandlingMiddleware>();

app.UseCors("AppClientDev");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();