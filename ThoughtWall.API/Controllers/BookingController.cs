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

        [HttpGet("created")]
        public async Task<IActionResult> GetCreatedBookings() {
            var user = await _context.Users.Where(x => x.Username == User.FindFirst(ClaimTypes.Name).Value).FirstOrDefaultAsync();
            if (user == null) return Unauthorized("User not found");

            var bookings = await _context.Bookings
                .Where(x => x.BookingOwnerId == user.Id)
                .Include(x => x.BookingOwner)
                .OrderByDescending(x => x.BookingCreated)
                .ToListAsync();

            var mappedBookings = _mapper.Map<BookingDto[]> (bookings);
            return Ok(mappedBookings);
        }

        [HttpGet("received")]
        public async Task<IActionResult> GetReceivedBookings() {
            var user = await _context.Users.Where(x => x.Username == User.FindFirst(ClaimTypes.Name).Value).FirstOrDefaultAsync();
            if (user == null) return Unauthorized("User not found");

            var bookings = await _context.Bookings
                .Where(x => x.BookedWithUserId == user.Id)
                .Include(x => x.BookedWithUser)
                .OrderByDescending(x => x.BookingCreated)
                .ToListAsync();

            var mappedBookings = _mapper.Map<BookingDto[]> (bookings);
            return Ok(mappedBookings);
        }

        [HttpPost("request")]
        public async Task<IActionResult> RequestBooking(int bookeeId, DateTime reqForDt)
        {
            var user = await _context.Users.Where(x => x.Username == User.FindFirst(ClaimTypes.Name).Value).FirstOrDefaultAsync();
            if (user == null) return Unauthorized("User not found");

            var bookee = await _context.Users.Where(x => x.Id == bookeeId).FirstOrDefaultAsync();
            if (bookee.BookingsEnabled == false) return BadRequest("User does not currently take bookings");

            DateTime currentDT = DateTime.Now;
            Booking newBooking = new Booking() {
                BookingOwnerId = user.Id,
                BookedWithUserId = bookeeId,
                BookingCreated = currentDT,
                BookingUpdated = currentDT,
                RequestedDT =  reqForDt,
                StatusId = 1, // pending
            };

            await _context.Bookings.AddAsync(newBooking);
            await _context.SaveChangesAsync();
            return StatusCode (201);
        }


        [HttpPut("accept")]
        public async Task<IActionResult> AcceptBooking(int bookingId) 
        {
            var user = await _context.Users.Where(x => x.Username == User.FindFirst(ClaimTypes.Name).Value).FirstOrDefaultAsync();
            if (user == null) return Unauthorized("User not found");

            DateTime currentDT = DateTime.Now;
            var booking = await _context.Bookings
                .Where(x => x.Id == bookingId)
                .FirstOrDefaultAsync();

            booking.StatusId = 2; // Approved
            booking.BookingUpdated = currentDT;

            _context.Bookings.Update(booking);
            await _context.SaveChangesAsync();

            var mappedBooking = _mapper.Map<BookingDto>(booking);
            return Ok(mappedBooking);
        }

        [HttpPut("decline")]
        public async Task<IActionResult> DeclineBooking(int bookingId) 
        {
            var user = await _context.Users.Where(x => x.Username == User.FindFirst(ClaimTypes.Name).Value).FirstOrDefaultAsync();
            if (user == null) return Unauthorized("User not found");

            DateTime currentDT = DateTime.Now;

            var booking = await _context.Bookings
                .Where(x => x.Id == bookingId)
                .FirstOrDefaultAsync();

            booking.StatusId = 3; // Declined
            booking.BookingUpdated = currentDT;

            _context.Bookings.Update(booking);
            await _context.SaveChangesAsync();

            var mappedBooking = _mapper.Map<BookingDto>(booking);
            return Ok(mappedBooking);
        }
    }
}

