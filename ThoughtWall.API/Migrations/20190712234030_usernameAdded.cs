using Microsoft.EntityFrameworkCore.Migrations;

namespace ThoughtWall.API.Migrations
{
    public partial class usernameAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "Threads",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Username",
                table: "Threads");
        }
    }
}
