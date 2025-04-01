using Homely.API.Setup;

WebApplication
    .CreateBuilder(args)
    .ConfigureServices()
    .Build()
    .PiplineSetup()
    .Run();