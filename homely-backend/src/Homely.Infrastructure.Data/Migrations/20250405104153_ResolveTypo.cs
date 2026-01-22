using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Homely.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class ResolveTypo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Urgency",
                keyColumn: "Id",
                keyValue: 3,
                column: "Name",
                value: "Medium");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Urgency",
                keyColumn: "Id",
                keyValue: 3,
                column: "Name",
                value: "Meduim");
        }
    }
}