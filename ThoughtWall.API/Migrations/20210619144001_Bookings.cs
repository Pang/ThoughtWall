using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ThoughtWall.API.Migrations
{
    public partial class Bookings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "BookingsEnabled",
                table: "Users",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "DimBookingStatus",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Status = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DimBookingStatus", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Booking",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    BookingOwnerId = table.Column<int>(nullable: false),
                    BookedWithUserId = table.Column<int>(nullable: false),
                    RequestedDT = table.Column<DateTime>(nullable: false),
                    StatusId = table.Column<int>(nullable: false),
                    BookingCreated = table.Column<DateTime>(nullable: false),
                    BookingUpdated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Booking", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Booking_Users_BookedWithUserId",
                        column: x => x.BookedWithUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Booking_Users_BookingOwnerId",
                        column: x => x.BookingOwnerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Booking_DimBookingStatus_StatusId",
                        column: x => x.StatusId,
                        principalTable: "DimBookingStatus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Booking_BookedWithUserId",
                table: "Booking",
                column: "BookedWithUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Booking_BookingOwnerId",
                table: "Booking",
                column: "BookingOwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Booking_StatusId",
                table: "Booking",
                column: "StatusId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Booking");

            migrationBuilder.DropTable(
                name: "DimBookingStatus");

            migrationBuilder.DropColumn(
                name: "BookingsEnabled",
                table: "Users");
        }
    }
}
