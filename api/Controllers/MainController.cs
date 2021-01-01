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

        private static SerialPortConnector _serialPortConnector;

        [Route("getData")]
        [HttpPost]
        public IActionResult getData([FromBody] DataModel input)
        {
            if(_serialPortConnector != null)
            {
                try
                {
                    string[] seznam = _serialPortConnector.Send(input.number,input.length);
                    return Ok(seznam);
                }
                catch (Exception)
                {
                    return BadRequest("failed");
                }
            }
            else
            {
                return BadRequest("no port settings");
            }
            
        }
        [Route("portSettings")]
        [HttpPost]
        public IActionResult portSettings([FromBody] SerialConnectorModel input)
        {
            try
            {
                _serialPortConnector = new SerialPortConnector(input.baundRate, input.portName);
                return Ok("port created");
            }
            catch
            {
                return BadRequest("failed");
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
