using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Ngo_Project3_Api.Model;
using System.Data;

namespace Ngo_Project3_Api.Controllers
{
    public class CategoryController : Controller
    {
        private readonly IConfiguration _configuration;
        private string _connectionString = "";

        public CategoryController(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("DefaultConnection");
        }
        //private readonly string _connectionString = "Server=localhost;Port=3306;Database=sys;User=root;Password=ngo_project3;";

        // GET: api/Category
        [HttpGet("GetCategory")]
        public async Task<IActionResult> GetCategory()
        {
            var Category = new List<Category>();

            using (var connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                string query = "SELECT * FROM Category";
                using (var command = new MySqlCommand(query, connection))
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            Category.Add(new Category
                            {
                                Id = reader.GetInt32("ID"),
                                Name = reader.GetString("NAME"),
                                Description = reader.GetString("DESCRIPTION"),
                                Order = reader.GetInt32("ORDER"),
                                IsActive = reader.GetInt32("ISACTIVE"),
                                Website = reader.GetString("WEBSITE"),
                                CreateTime = reader.GetDateTime("CREATE_TIME"),
                                UpdateTime = reader.GetDateTime("UPDATE_TIME")
                            });
                        }
                    }
                }

            }

            return Ok(Category);
        }


        [HttpPost("CreateCategory")]
        public async Task<IActionResult> InsertCategory([FromBody] Category Category)
        {
            Response res = null;
            try
            {

                using (var connection = new MySqlConnection(_connectionString))
                {
                    await connection.OpenAsync();
                    string query2 = "INSERT INTO Category (NAME, DESCRIPTION,`ORDER`,ISACTIVE,WEBSITE, CREATE_TIME, UPDATE_TIME) VALUES (@Name, @Description,@Order,@IsActive,@Website, @CreateTime, @UpdateTime)";
                    using (var command = new MySqlCommand(query2, connection))
                    {
                        command.Parameters.AddWithValue("@Name", Category.Name);
                        command.Parameters.AddWithValue("@Description", Category.Description);
                        command.Parameters.AddWithValue("@Order", Category.Order);
                        command.Parameters.AddWithValue("@IsActive", Category.IsActive);
                        command.Parameters.AddWithValue("@Website", Category.Website);
                        command.Parameters.AddWithValue("@CreateTime", DateTime.UtcNow);
                        command.Parameters.AddWithValue("@UpdateTime", DateTime.UtcNow);

                        await command.ExecuteNonQueryAsync();
                    }

                }


                res = new Response
                {
                    code = "00",
                    error = "Success."
                };


            }
            catch (Exception ex)
            {
                res = new Response
                {
                    code = "99",
                    error = ex.Message
                };
            }



            return Ok(res);
        }


        [HttpPost("UpdateCategory")]
        public async Task<IActionResult> UpdateCategory([FromBody] Category Category)
        {

            Response res = null;

            using (var connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                string query = "UPDATE Category SET NAME = @Name, DESCRIPTION = @Description,`ORDER` = @Order,ISACTIVE = @IsActive, WEBSITE = @Website, UPDATE_TIME = @UpdateTime WHERE ID = @Id";
                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Id", Category.Id);
                    command.Parameters.AddWithValue("@Name", Category.Name);
                    command.Parameters.AddWithValue("@Description", Category.Description);
                    command.Parameters.AddWithValue("@Order", Category.Order);
                    command.Parameters.AddWithValue("@IsActive", Category.IsActive);
                    command.Parameters.AddWithValue("@Website", Category.Website);
                    command.Parameters.AddWithValue("@UpdateTime", DateTime.UtcNow);
                    command.Parameters.AddWithValue("@CreateTime", DateTime.UtcNow);

                    var rowsAffected = await command.ExecuteNonQueryAsync();
                    if (rowsAffected == 0)
                    {
                        res = new Response
                        {
                            code = "99",
                            error = "Category not found."
                        };

                        return Ok(res);
                    }
                }

            }

            res = new Response
            {
                code = "00",
                error = "Success."
            };

            return Ok(res);
        }


        [HttpDelete("category/{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            Response res = null;

            using (var connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                string query = "DELETE FROM Category WHERE ID = @Id";
                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Id", id);
                    var rowsAffected = await command.ExecuteNonQueryAsync();
                    if (rowsAffected == 0)
                    {
                        res = new Response
                        {
                            code = "99",
                            error = "Category not found."
                        };

                        return Ok(res);
                    }
                }

            }

            res = new Response
            {
                code = "00",
                error = "Success."
            };

            return Ok(res);
        }
    }
}
