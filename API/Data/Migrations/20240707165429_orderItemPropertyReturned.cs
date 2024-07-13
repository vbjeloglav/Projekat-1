using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.MIgrations
{
    /// <inheritdoc />
    public partial class orderItemPropertyReturned : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Returned",
                table: "OrderItem",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Returned",
                table: "OrderItem");
        }
    }
}
