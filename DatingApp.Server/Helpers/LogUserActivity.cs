using System.Security.Claims;
using DatingApp.Server.Data;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DatingApp.Server.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            //we use CONTEXT when we want to do something when the action is being executed
            //we use NEXT to run some code after the action has been executed
            
            var resultContext = await next();   //wait untill action is completed and use resultContext

            var userId = int.Parse(resultContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var repo = resultContext.HttpContext.RequestServices.GetService<IDatingRepository>();

            var user = await repo.GetUser(userId);

            user.LastActive = DateTime.Now;

            await repo.SaveAll();
        }
    }
}
