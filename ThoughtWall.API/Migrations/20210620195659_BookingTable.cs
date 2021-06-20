using Microsoft.EntityFrameworkCore.Migrations;

namespace ThoughtWall.API.Migrations
{
    public partial class BookingTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Booking_Users_BookedWithUserId",
                table: "Booking");

            migrationBuilder.DropForeignKey(
                name: "FK_Booking_Users_BookingOwnerId",
                table: "Booking");

            migrationBuilder.DropForeignKey(
                name: "FK_Booking_DimBookingStatus_StatusId",
                table: "Booking");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DimBookingStatus",
                table: "DimBookingStatus");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Booking",
                table: "Booking");

            migrationBuilder.RenameTable(
                name: "DimBookingStatus",
                newName: "DimBookingStatuses");

            migrationBuilder.RenameTable(
                name: "Booking",
                newName: "Bookings");

            migrationBuilder.RenameIndex(
                name: "IX_Booking_StatusId",
                table: "Bookings",
                newName: "IX_Bookings_StatusId");

            migrationBuilder.RenameIndex(
                name: "IX_Booking_BookingOwnerId",
                table: "Bookings",
                newName: "IX_Bookings_BookingOwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_Booking_BookedWithUserId",
                table: "Bookings",
                newName: "IX_Bookings_BookedWithUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DimBookingStatuses",
                table: "DimBookingStatuses",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Bookings",
                table: "Bookings",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Users_BookedWithUserId",
                table: "Bookings",
                column: "BookedWithUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Users_BookingOwnerId",
                table: "Bookings",
                column: "BookingOwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_DimBookingStatuses_StatusId",
                table: "Bookings",
                column: "StatusId",
                principalTable: "DimBookingStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Users_BookedWithUserId",
                table: "Bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Users_BookingOwnerId",
                table: "Bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_DimBookingStatuses_StatusId",
                table: "Bookings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DimBookingStatuses",
                table: "DimBookingStatuses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Bookings",
                table: "Bookings");

            migrationBuilder.RenameTable(
                name: "DimBookingStatuses",
                newName: "DimBookingStatus");

            migrationBuilder.RenameTable(
                name: "Bookings",
                newName: "Booking");

            migrationBuilder.RenameIndex(
                name: "IX_Bookings_StatusId",
                table: "Booking",
                newName: "IX_Booking_StatusId");

            migrationBuilder.RenameIndex(
                name: "IX_Bookings_BookingOwnerId",
                table: "Booking",
                newName: "IX_Booking_BookingOwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_Bookings_BookedWithUserId",
                table: "Booking",
                newName: "IX_Booking_BookedWithUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DimBookingStatus",
                table: "DimBookingStatus",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Booking",
                table: "Booking",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Booking_Users_BookedWithUserId",
                table: "Booking",
                column: "BookedWithUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Booking_Users_BookingOwnerId",
                table: "Booking",
                column: "BookingOwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Booking_DimBookingStatus_StatusId",
                table: "Booking",
                column: "StatusId",
                principalTable: "DimBookingStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
