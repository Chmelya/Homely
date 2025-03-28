using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Homely.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AdjustServiceRequests : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ServiceRequest_Users_CreatorId",
                table: "ServiceRequest");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiceRequest_Users_HandlerId",
                table: "ServiceRequest");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiceRequestDetails_ServiceRequest_ServiceRequestId",
                table: "ServiceRequestDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ServiceRequest",
                table: "ServiceRequest");

            migrationBuilder.RenameTable(
                name: "ServiceRequest",
                newName: "ServiceRequests");

            migrationBuilder.RenameIndex(
                name: "IX_ServiceRequest_HandlerId",
                table: "ServiceRequests",
                newName: "IX_ServiceRequests_HandlerId");

            migrationBuilder.RenameIndex(
                name: "IX_ServiceRequest_CreatorId",
                table: "ServiceRequests",
                newName: "IX_ServiceRequests_CreatorId");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ServiceRequestDetails",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Category",
                table: "ServiceRequests",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Urgency",
                table: "ServiceRequests",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ServiceRequests",
                table: "ServiceRequests",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ServiceRequestStatus",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceRequestStatus", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Urgency",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Urgency", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ServiceRequests_Category",
                table: "ServiceRequests",
                column: "Category");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceRequests_Status",
                table: "ServiceRequests",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceRequests_Urgency",
                table: "ServiceRequests",
                column: "Urgency");

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceRequestDetails_ServiceRequests_ServiceRequestId",
                table: "ServiceRequestDetails",
                column: "ServiceRequestId",
                principalTable: "ServiceRequests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceRequests_Category_Category",
                table: "ServiceRequests",
                column: "Category",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceRequests_ServiceRequestStatus_Status",
                table: "ServiceRequests",
                column: "Status",
                principalTable: "ServiceRequestStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceRequests_Urgency_Urgency",
                table: "ServiceRequests",
                column: "Urgency",
                principalTable: "Urgency",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceRequests_Users_CreatorId",
                table: "ServiceRequests",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceRequests_Users_HandlerId",
                table: "ServiceRequests",
                column: "HandlerId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ServiceRequestDetails_ServiceRequests_ServiceRequestId",
                table: "ServiceRequestDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiceRequests_Category_Category",
                table: "ServiceRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiceRequests_ServiceRequestStatus_Status",
                table: "ServiceRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiceRequests_Urgency_Urgency",
                table: "ServiceRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiceRequests_Users_CreatorId",
                table: "ServiceRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiceRequests_Users_HandlerId",
                table: "ServiceRequests");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "ServiceRequestStatus");

            migrationBuilder.DropTable(
                name: "Urgency");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ServiceRequests",
                table: "ServiceRequests");

            migrationBuilder.DropIndex(
                name: "IX_ServiceRequests_Category",
                table: "ServiceRequests");

            migrationBuilder.DropIndex(
                name: "IX_ServiceRequests_Status",
                table: "ServiceRequests");

            migrationBuilder.DropIndex(
                name: "IX_ServiceRequests_Urgency",
                table: "ServiceRequests");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "ServiceRequestDetails");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "ServiceRequests");

            migrationBuilder.DropColumn(
                name: "Urgency",
                table: "ServiceRequests");

            migrationBuilder.RenameTable(
                name: "ServiceRequests",
                newName: "ServiceRequest");

            migrationBuilder.RenameIndex(
                name: "IX_ServiceRequests_HandlerId",
                table: "ServiceRequest",
                newName: "IX_ServiceRequest_HandlerId");

            migrationBuilder.RenameIndex(
                name: "IX_ServiceRequests_CreatorId",
                table: "ServiceRequest",
                newName: "IX_ServiceRequest_CreatorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ServiceRequest",
                table: "ServiceRequest",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceRequest_Users_CreatorId",
                table: "ServiceRequest",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceRequest_Users_HandlerId",
                table: "ServiceRequest",
                column: "HandlerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceRequestDetails_ServiceRequest_ServiceRequestId",
                table: "ServiceRequestDetails",
                column: "ServiceRequestId",
                principalTable: "ServiceRequest",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
