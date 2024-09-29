namespace DatingApp.Server.Helpers
{
    //general purpose class for adding extension methods
    public static class Extensions
    {
        //since here is about extension methods, we don't want this class to have new instances

        public static void AddApplicationError(this HttpResponse response,  string message)
        {
            response.Headers.Add("Application-Error", message);
            //these two allow first one to be displayed
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }
    } 
}
