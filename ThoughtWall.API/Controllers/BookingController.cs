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
    [Route ("api/values")]
    [ApiController]
    public class BookingController : ControllerBase {
        private readonly DataContext _context;
        private readonly IHubContext<PostHub> _hubContext;
        private readonly IMapper _mapper;

        public BookingController (DataContext context, IHubContext<PostHub> hubContext, IMapper mapper) {
            _context = context;
            _hubContext = hubContext;
            _mapper = mapper;
        }

        [HttpGet]
        [HttpGet ("created")]
        public async Task<IActionResult> GetCreatedBookings(int id) {
            var bookings = await _context.Bookings
                .Where(x => x.BookingOwnerId == id)
                .Include(x => x.BookingOwner)
                .OrderByDescending(x => x.BookingCreated)
                .ToListAsync();

            var mappedBookings = _mapper.Map<BookingDto[]> (bookings);
            return Ok(mappedBookings);
        }

        [HttpGet]
        [HttpGet ("received")]
        public async Task<IActionResult> GetReceivedBookings(int id) {
            var bookings = await _context.Bookings
                .Where(x => x.BookedWithUserId == id)
                .Include(x => x.BookedWithUser)
                .OrderByDescending(x => x.BookingCreated)
                .ToListAsync();

            var mappedBookings = _mapper.Map<BookingDto[]> (bookings);
            return Ok(mappedBookings);
        }
    }
}