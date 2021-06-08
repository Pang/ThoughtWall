using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using ThoughtWall.API.Data;
using ThoughtWall.API.Dtos;
using ThoughtWall.API.Hubs;
using ThoughtWall.API.Models;

namespace ThoughtWall.API.Controllers {
    [Authorize]
    [Route ("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase {
        private readonly DataContext _context;
        private readonly IHubContext<PostHub> _hubContext;
        private readonly IMapper _mapper;

        public ValuesController (DataContext context, IHubContext<PostHub> hubContext, IMapper mapper) {
            _context = context;
            _hubContext = hubContext;
            _mapper = mapper;
        }

        // GET api/values
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetThreads (int pageNo) {
            int noToSkip = (pageNo * 5) - 5;
            // Orders by most recent (using TimeStamp)
            var threads = await _context.Threads
                .OrderByDescending (x => x.TimeStamp)
                // .Skip (noToSkip)
                .Take (50)
                .Include (x => x.Comments)
                .ToListAsync ();
            var mappedThreads = _mapper.Map<ThreadGetDto[]> (threads);
            return Ok (mappedThreads);
        }

        // // GET Older Threads
        // [AllowAnonymous]
        // [HttpGet("archives")]
        // public async Task<IActionResult> GetOldThreads(int skip)
        // {
        //     var oldThreads = await _context.Threads
        //         .Include(x => x.Comments)
        //         .OrderByDescending(x => x.TimeStamp)
        //         .Skip(skip)
        //         .Take(5)
        //         .ToListAsync();
        //     var mappedOldThreads = _mapper.Map<ThreadGetDto[]>(oldThreads);
        //     return Ok(mappedOldThreads);
        // }

        [AllowAnonymous]
        [HttpGet ("search")]
        public async Task<IActionResult> GetSearchedThreads (string keyword) {
            var matches = await _context.Threads
                .Include (x => x.Comments)
                .Where (x => x.Title.ToLower ().Contains (keyword.ToLower ()))
                .OrderByDescending (x => x.TimeStamp)
                .ToListAsync ();
            var mappedMatches = _mapper.Map<ThreadGetDto[]> (matches);
            return Ok (mappedMatches);
        }

        // GET api/values/5
        [AllowAnonymous]
        [HttpGet ("{id}")]
        [ProducesResponseType (404)]
        [ProducesResponseType (200)]

        public async Task<IActionResult> GetSpecificThread (int id) {
            var thread = await _context.Threads.FindAsync (id);
            if (thread == null) {
                return NotFound ();
            }
            var mappedThread = _mapper.Map<ThreadGetDto> (thread);
            return Ok (mappedThread);
        }

        // POST api/values/submit
        [HttpPost ("submit")]
        [ProducesResponseType (201)]
        public async Task<IActionResult> PostThread (ThreadPostDto threadPostDto) {
            DateTime timeStamp = DateTime.Now;
            var mappedThread = _mapper.Map<Thread> (threadPostDto);
            mappedThread.Username = User.FindFirst (ClaimTypes.Name).Value;
            mappedThread.UserId = int.Parse (User.FindFirst (ClaimTypes.NameIdentifier).Value);
            mappedThread.TimeStamp = timeStamp;

            await _context.Threads.AddAsync (mappedThread);
            await _context.SaveChangesAsync ();
            return StatusCode (201);
        }

        // Is called after posting a new thread
        [AllowAnonymous]
        [HttpGet ("redirect")]
        public async Task<IActionResult> Redirects (string title) {
            var id = await _context.Threads
                .OrderByDescending (x => x.TimeStamp)
                .Where (x => x.Title == title)
                .FirstAsync ();

            return Ok (id.Id);
        }

        [HttpPut ("edit")]
        [ProducesResponseType (204)]
        [ProducesResponseType (401)]
        public async Task<IActionResult> EditPost (ThreadGetDto threadGetDto) {
            if (threadGetDto.Username != User.FindFirst (ClaimTypes.Name).Value)
                return Unauthorized ();

            var mappedThread = _mapper.Map<Thread> (threadGetDto);
            var originalPost = await _context.Threads.FirstOrDefaultAsync (thread => thread.Id == mappedThread.Id);
            originalPost.Body = mappedThread.Body;
            _context.Threads.Update (originalPost);
            await _context.SaveChangesAsync ();
            return StatusCode (204);
        }

        // GET api/values/5/comments
        [AllowAnonymous]
        [HttpGet ("{id}/comments")]
        public async Task<IActionResult> GetComments (string id) {
            var comments = await _context.Comments
                .Where (x => x.ThreadId == Int32.Parse (id))
                .OrderByDescending (x => x.TimeStamp)
                .ToListAsync ();
            var mappedComments = _mapper.Map<CommentGetDto[]> (comments);
            return Ok (mappedComments);
        }

        [AllowAnonymous]
        [HttpGet ("{id}/latestComment")]
        public async Task<IActionResult> GetLatestComment (string id) {
            var comment = await _context.Comments
                .Where (x => x.ThreadId == Int32.Parse (id))
                .OrderByDescending (x => x.TimeStamp)
                .FirstAsync ();
            var mappedComment = _mapper.Map<CommentGetDto> (comment);
            return Ok (mappedComment);
        }
        // POST api/values/comment
        [HttpPost ("comment")]
        [ProducesResponseType (201)]
        public async Task<IActionResult> PostComment (CommentPostDto commentPostDto) {
            DateTime timeStamp = DateTime.Now;
            var mappedComment = _mapper.Map<Comment> (commentPostDto);
            mappedComment.Username = User.FindFirst (ClaimTypes.Name).Value;
            mappedComment.UserId = int.Parse (User.FindFirst (ClaimTypes.NameIdentifier).Value);
            mappedComment.TimeStamp = timeStamp;

            await _context.Comments.AddAsync (mappedComment);
            await _context.SaveChangesAsync ();
            await _hubContext.Clients.Group (mappedComment.ThreadId.ToString ()).SendAsync ("newComment", mappedComment);
            return StatusCode (201);
        }
    }
}