namespace ThoughtWall.API.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public Thread thread { get; set; }
        public string body { get; set; }
    }
}