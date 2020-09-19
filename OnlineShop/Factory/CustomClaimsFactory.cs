using Entities.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;

namespace OnlineShop.Factory
{
    public class CustomClaimsFactory : UserClaimsPrincipalFactory<User>
    {
        public CustomClaimsFactory(UserManager<User> userManager, IOptions<IdentityOptions> optionsAccessor)
            : base(userManager, optionsAccessor)
        {
        }

        protected override async Task<ClaimsIdentity> GenerateClaimsAsync(User user)
        {
            var identity = await base.GenerateClaimsAsync(user);
            identity.AddClaim(new Claim("firstname", user.FirstName));
            identity.AddClaim(new Claim("lastname", user.LastName));
            identity.AddClaim(new Claim("mobile", user.PhoneNumber));
            var a = await UserManager.GetRolesAsync(user);
            identity.AddClaim(new Claim("Role", a.DefaultIfEmpty("Visitor").FirstOrDefault()));
          

            return identity;
        }
    }
}