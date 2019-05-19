using Microsoft.EntityFrameworkCore.Migrations;

namespace ThoughtWall.API.Migrations
{
    public partial class changeCommentColNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Threads_threadId",
                table: "Comments");

            migrationBuilder.RenameColumn(
                name: "threadId",
                table: "Comments",
                newName: "ThreadId");

            migrationBuilder.RenameColumn(
                name: "body",
                table: "Comments",
                newName: "Body");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_threadId",
                table: "Comments",
                newName: "IX_Comments_ThreadId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Threads_ThreadId",
                table: "Comments",
                column: "ThreadId",
                principalTable: "Threads",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Threads_ThreadId",
                table: "Comments");

            migrationBuilder.RenameColumn(
                name: "ThreadId",
                table: "Comments",
                newName: "threadId");

            migrationBuilder.RenameColumn(
                name: "Body",
                table: "Comments",
                newName: "body");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_ThreadId",
                table: "Comments",
                newName: "IX_Comments_threadId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Threads_threadId",
                table: "Comments",
                column: "threadId",
                principalTable: "Threads",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
