const { TwitterApi } = require("twitter-api-v2");//Se llama a la api
const client = require("./config/client");//Se llamo al archivo client que contiene las KEYS
const cron = require("node-cron");//Programar tareas en JavaScript (sirvio para calcular el dia de la fecha del evento y la fecha del dia en el que estamos)
const path = require("path");//Manejo de las rutas de los archivos
const { finished } = require("stream");
const { exit } = require("process");

const botMundial = async (test = "20") => {
  try {

    // FECHA DEL MUNDIAL
    const deadline = new Date(`nov, ${test} 2022, 00:00:00`).getTime();

    //Tiempo actual
    const now = new Date().getTime();

    //Calcule la distancia entre la fecha límite del evento y la hora actual
    const distance = deadline - now;

    // convertir milisegundos a dias, horas, minutos y segundos
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);


    //CREAR UN MENSAJE
    const defaultMessage = `Solo faltan: ${days} Dias, ${hours} horas, ${minutes} minutos, ${seconds} segudos  `;

    const randomMessage = [
      "#LasBotinesDeMessiSonGood!",
      "#MESSIRVE!",
      "#QATAR2022!!",
    ][Math.floor(Math.random() * 3)];

    //Declaro variables texto y fecha
    let imageUrl, text;

    if (days < 2) {
      text = `FALTA MUY POCOOOOOOO!\n${defaultMessage}\n${randomMessage}`;
      imageUrl = "../imagenes/imagen2.jpg";
      console.log("menos 2")
    } else if (days < 8) {
      text = `CADA VEZ MENOS PARA QUE COMIENZE ¡¡QATAR!!! ESTAS LISTO?\n${defaultMessage}\n${randomMessage}`;
      imageUrl = "../imagenes/imagen3.jpg";
      console.log("menos 10")
    } else {
      text = `COMENZO EL CONTEO PARA EL MUNDIAL!!!!\n${defaultMessage}\n${randomMessage}`;
      imageUrl = "../imagenes/imagen1.jpg";
      console.log("menos algo")
    }

    console.log(text);


    // Subir imagen a twitter

    const mediaId = await client.v1.uploadMedia(path.join(__dirname, imageUrl));

    //Tuitear el twit!
    
    const tweet = await client.v2.tweet({
      text,
      media: { media_ids: [mediaId] },
    });

    // VERIFICACION EN LA CONSOLA
    // console.log("funciona");

    if(deadline == now){
      exit.botMundial()
    }


  } catch (error) {
    console.log(error);
  }
};

// test para probar con dias para no esperar 24hs

// const testBot = () => {
//   const tests = ["12", "5", "1"];
//   tests.forEach((test) => botMundial(test));
// };

// testBot();


//El bot se ejecutara cada 1 dia.

const task = cron.schedule("* * */23 * * *", () => {
  botMundial();
});

task.start();
