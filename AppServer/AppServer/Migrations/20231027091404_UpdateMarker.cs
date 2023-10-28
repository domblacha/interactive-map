using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppServer.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMarker : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Marker_AspNetUsers_UserId",
                table: "Marker");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Marker",
                table: "Marker");

            migrationBuilder.RenameTable(
                name: "Marker",
                newName: "Markers");

            migrationBuilder.RenameColumn(
                name: "MarkerId",
                table: "Markers",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_Marker_UserId",
                table: "Markers",
                newName: "IX_Markers_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Markers",
                table: "Markers",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Markers_AspNetUsers_UserId",
                table: "Markers",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Markers_AspNetUsers_UserId",
                table: "Markers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Markers",
                table: "Markers");

            migrationBuilder.RenameTable(
                name: "Markers",
                newName: "Marker");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Marker",
                newName: "MarkerId");

            migrationBuilder.RenameIndex(
                name: "IX_Markers_UserId",
                table: "Marker",
                newName: "IX_Marker_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Marker",
                table: "Marker",
                column: "MarkerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Marker_AspNetUsers_UserId",
                table: "Marker",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
