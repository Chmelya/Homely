using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Homely.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddPerformers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Performers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Category = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Performers", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Performers",
                columns: new[] { "Id", "Category", "Name" },
                values: new object[,]
                {
                    { 1, 2, "Water organization 1" },
                    { 2, 3, "Sewer organization" },
                    { 3, 4, "Electricity organization" },
                    { 4, 5, "Garbage organization" },
                    { 5, 5, "Barone sanitaion" },
                    { 6, 6, "Road organization" },
                    { 7, 7, "Parking organization" },
                    { 8, 2, "Water organization 2" },
                    { 9, 2, "Water organization 3" },
                    { 10, 1, "Other organization 1" },
                    { 11, 1, "Other organization 2" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Performers_Name",
                table: "Performers",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Performers");
        }
    }
}
