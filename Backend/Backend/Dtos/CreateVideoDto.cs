﻿using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class CreateVideoDto
    {
        [MinLength(5)]
        public string Title { get; set; }
    }
}
