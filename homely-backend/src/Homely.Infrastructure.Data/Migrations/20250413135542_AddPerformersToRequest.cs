using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Homely.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddPerformersToRequest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PerformerId",
                table: "ServiceRequestDetails",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ServiceRequestDetails_PerformerId",
                table: "ServiceRequestDetails",
                column: "PerformerId");

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceRequestDetails_Performers_PerformerId",
                table: "ServiceRequestDetails",
                column: "PerformerId",
                principalTable: "Performers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ServiceRequestDetails_Performers_PerformerId",
                table: "ServiceRequestDetails");

            migrationBuilder.DropIndex(
                name: "IX_ServiceRequestDetails_PerformerId",
                table: "ServiceRequestDetails");

            migrationBuilder.DropColumn(
                name: "PerformerId",
                table: "ServiceRequestDetails");
        }
    }
}
