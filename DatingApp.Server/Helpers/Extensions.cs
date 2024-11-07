using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace DatingApp.Server.Helpers
{
    //general purpose class for adding extension methods
    public static class Extensions
    {
        //since here is about extension methods, we don't want this class to have new instances

        public static void AddApplicationError(this HttpResponse response,  string message)
        {
            response.Headers.Append("Application-Error", message);
            //these two allow first one to be displayed
            response.Headers.Append("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Append("Access-Control-Allow-Origin", "*");
        }

        public static void AddPagination(this HttpResponse response, int currentPage, int itemsPerPage, int totalItems, int totalPages)
        {
            var paginationHeader = new PaginationHeader(currentPage, totalPages, itemsPerPage, totalItems);
            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();

            response.Headers.Append("Pagination", JsonConvert.SerializeObject(paginationHeader, camelCaseFormatter));
            response.Headers.Append("Access-Control-Expose-Headers", "Pagination");
        }
    } 
}
