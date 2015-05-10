using System;
using System.Data.Entity.Validation;
using System.Linq;

namespace SoftwareRequirementsTool.Utilities.ErrorMessages
{
    public class ErrorMessageHelper
    {
        public static string GetMessage(Exception ex)
        {
            var message = "";

            var exception = ex as DbEntityValidationException;
            if (exception != null)
            {
                message = GetMessage(exception);
            }

            message += ex.Message;

            if (ex.InnerException != null)
            {
                message += "| Inner: " + GetMessage(ex.InnerException);
            }

            return message;
        }

        public static string GetMessage(DbEntityValidationException ex)
        {
            var msg = "The validation errors are: ";
            var errorMessages = ex.EntityValidationErrors
                .SelectMany(x => x.ValidationErrors)
                .Select(x=>x.ErrorMessage);

            return msg + string.Join("; ", errorMessages);
        }

    }
}
