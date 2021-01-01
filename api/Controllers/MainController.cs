using api.library;
using api.Models;
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

        private SerialPortConnector _serialPortConnector;
        public MainController()
        {
            _serialPortConnector = new SerialPortConnector();
        }
        [Route("getData")]
        [HttpGet]
        public string[] getData()
        {
         
            try
            {
                string[] seznam = _serialPortConnector.Send(4, 150);
                return seznam;
            }
            catch(Exception)
            {
                return null;
            }
        }

        
        [Route("getPorts")]
        [HttpGet]
        public string[] GetPorts()
        {
            string[] ports = SerialPort.GetPortNames();
            Console.WriteLine(ports.Length);
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
