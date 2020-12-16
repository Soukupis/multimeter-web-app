using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO.Ports;
using System.Linq;
using System.Threading.Tasks;

namespace api.Controllers
{
    public class MainController
    {

        private static readonly string[] Summaries = new[]
        {
            "MIC", "TEMP", "PHOTO", "TRIM1", "TRIM2", "TRIM3"
        };

        [HttpGet]
        public Task<string[]> Get()
        {
            string[] ports = SerialPort.GetPortNames();
            return ports;
        }
    }
}
