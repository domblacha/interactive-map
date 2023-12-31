﻿using AppServer.Entities;
using AppServer.Excepions;
using AppServer.Models.Request;
using AppServer.Models.Response;
using AppServer.Services.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AppServer.Services
{
    public class CommentService : ICommentService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CommentService(AppDbContext dbContext, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<CommentResponse> CreateCommentAsync(CreateCommentDto dto)
        {
            var userId = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = await _dbContext
                 .Users
                 .FirstOrDefaultAsync(user => user.Id == userId);

            if (user is null)
            {
                throw new BadRequestException("Coś poszło nie tak, spróbuj później");
            }

            var marker = await _dbContext
                .Markers
                .FirstOrDefaultAsync(marker => marker.Id == dto.MarkerId);

            if (marker is null)
            {
                throw new NotFoundException("Dodawanie komentarza nie powiodło się. Zasób nie istnieje");
            }

            var newComment = new Comment()
            {
                Text = dto.Text,
                MarkerId = dto.MarkerId,
                Rating = dto.Rating,
                UserId = userId!,
                User = user
            };

            _dbContext.Add(newComment);
            await _dbContext.SaveChangesAsync();

            return _mapper.Map<CommentResponse>(newComment);
        }
    }
}