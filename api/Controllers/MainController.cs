using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO.Ports;
using System.Linq;
using System.Threading.Tasks;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MainController : ControllerBase
    {

        private static readonly string[] Modes = new[]
        {
            "MIC", "TEMP", "PHOTO", "TRIM1", "TRIM2", "TRIM3"
        };
        [Route("getPorts")]
        [HttpGet]
        public string[] GetPorts()
        {
            string[] ports = SerialPort.GetPortNames();
            return ports;
        }
        [Route("getModes")]
        [HttpGet]
        public string[] GetModes()
        {
            return Modes;
        }
    }
}
