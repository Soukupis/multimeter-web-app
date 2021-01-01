void setup() {
  // initialize both serial ports:
  
  Serial.begin(115200);
  randomSeed(analogRead(0));
  Serial.print("---zacatek---");
}

  int ad_in = 0;
  int cas = 100;
  int in_Byte;
  int randNumber;
  bool mereni = false;

void loop() {
  
  //randNumber = random(100 * ad_in, 100 * (ad_in + 1));
  // read from port 1, send to port 0:
  if (Serial.available() > 0) {
    in_Byte = Serial.read();
   
    if (in_Byte >= '0' && in_Byte <= '5') //vyber analogoveho vstupu
    {
      ad_in = in_Byte - '0';
    }
    else if (in_Byte == 'M')  //spusteni mereni
    {
      mereni = true;
    }
    else if (in_Byte == 'S')  //zastaveni mereni
    {
      mereni = false;
    }
    //vyber rychlosti opakovani mereni
    else if (in_Byte >= 'a' && in_Byte <= 'j') cas = (1 + in_Byte - 'a') * 50;
    else
    {
      switch (in_Byte)  //vyber prenosove rychlosti
      {
        case 'A': Serial.end();  Serial.begin(9600);// 9600
        break;
        case 'B': Serial.end();  Serial.begin(14400);// 14400
        break;
        case 'C': Serial.end();  Serial.begin(19200);// 19200
        break;
        case 'D': Serial.end();  Serial.begin(28800);// 28800
        break;
        case 'E': Serial.end();  Serial.begin(38400);// 38400
        break;
        case 'F': Serial.end();  Serial.begin(57600);// 57600
        break;
        case 'G': Serial.end();  Serial.begin(115200);// 115200
        break;
      }
    }
  }

  if (mereni)
  {
    // print a random number from 10 to 19
    randNumber = random(100 * ad_in, 100 * (ad_in + 1));
    Serial.println(randNumber);
  }
  delay(100);
}
