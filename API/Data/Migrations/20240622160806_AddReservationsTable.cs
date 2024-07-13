using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.MIgrations
{
    /// <inheritdoc />
    public partial class AddReservationsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItem_OrdersRezervisano_OrderRezervisanoId",
                table: "OrderItem");

            migrationBuilder.DropTable(
                name: "OrdersRezervisano");

            migrationBuilder.DropIndex(
                name: "IX_OrderItem_OrderRezervisanoId",
                table: "OrderItem");

            migrationBuilder.DropColumn(
                name: "OrderRezervisanoId",
                table: "OrderItem");

            migrationBuilder.CreateTable(
                name: "RezervisanaOprema",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ProductId = table.Column<int>(type: "INTEGER", nullable: false),
                    CustomerName = table.Column<string>(type: "TEXT", nullable: true),
                    CustomerEmail = table.Column<string>(type: "TEXT", nullable: true),
                    ReservedFrom = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ReservedTo = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RezervisanaOprema", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RezervisanaOprema");

            migrationBuilder.AddColumn<int>(
                name: "OrderRezervisanoId",
                table: "OrderItem",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "OrdersRezervisano",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    BUyerId = table.Column<string>(type: "TEXT", nullable: true),
                    OrderData = table.Column<DateTime>(type: "TEXT", nullable: false),
                    OrderStatus = table.Column<int>(type: "INTEGER", nullable: false),
                    Subtotal = table.Column<long>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrdersRezervisano", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderItem_OrderRezervisanoId",
                table: "OrderItem",
                column: "OrderRezervisanoId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItem_OrdersRezervisano_OrderRezervisanoId",
                table: "OrderItem",
                column: "OrderRezervisanoId",
                principalTable: "OrdersRezervisano",
                principalColumn: "Id");
        }
    }
}
