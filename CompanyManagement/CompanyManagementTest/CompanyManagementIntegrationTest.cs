using CompanyManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace CompanyManagementTest;

[TestFixture]
public class Tests
{
    [SetUp]
    public void Setup()
    { 
        
    }
    
    [TearDown]
    public void TearDown()
    {

    }

    [Test]
    public void CanConnectToRealDatabase()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<UsersContext>()
            .UseSqlServer("Server=localhost,1433;Database=WeatherApi;User Id=sa;Password=yourStrong(!)Password;")
            .Options;

        using (var context = new UsersContext(options))
        {
            // Act
            var isDatabaseConnected = context.Database.CanConnect();

            // Assert
            Assert.IsTrue(isDatabaseConnected);
        }
    }

}