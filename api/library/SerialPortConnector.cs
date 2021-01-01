using System;
using System.Collections.Generic;
using System.IO.Ports;
using System.Threading;

namespace api.library
{
    public class SerialPortConnector
    {
        private readonly int _baundRate = 115200;
        private readonly string _portName = "/dev/cu.usbserial-141220";

        public string[] Send(int cislo, int pocetCisel)
        {
            using (var serialPort = new SerialPort(_portName, _baundRate))
            {
                serialPort.Open();
                Thread.Sleep(100);
                string[] seznam = new string[26];
                bool loop = true;
                int count = 0;
                while (loop)
                {
                    serialPort.Write("M");
                    serialPort.Write(cislo.ToString());
                    string readPort = serialPort.ReadExisting();
                    if(readPort != "" && readPort != "---zacatek---" && readPort.Length == 5)
                    {
                        string temp = "";
                        for(int i = 0; i < readPort.Length; i++)
                        {
                            if (Char.IsDigit(readPort[i]))
                                temp += readPort[i];
                        }
                        seznam[count] = temp;
                        count++;
                    }
                    if (count > 25)
                    {
                        return seznam;
                    }

                }
                return seznam;

            }
        }
    }
}
