require('dotenv').config();
const { leerInput, pausa, inquirerMenu, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas')


const main  = async() => {

    const busquedas = new Busquedas();

    let opt;

    do{

        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //moostrar mensaje
                const termino = await leerInput('Ciudad:');



                //buscar los lugares
                const lugares = await busquedas.ciudad(termino);

                //seleccionar el luger/
                const idSeleccionado = await listarLugares(lugares);
                if(idSeleccionado==='0') continue;

                const lugarSel = lugares.find( l => l.id === idSeleccionado);
                const { nombre, lat, lng} = lugarSel;

                //Guardar en la BD
                busquedas.agregarHistorial(lugarSel.nombre);



                //clima
                const clima = await busquedas.climaLugar(lat,lng);
                const {desc,min, max, temp} = clima
                console.clear();

                //mostrar resultados
                console.log('\nInformacion del Lugar\n'.green);
                console.log('Ciudad:',nombre.green);
                console.log('Lat:', lat);
                console.log('Log:',lng);
                console.log('Temperatura:', temp);
                console.log('Minima:',min);
                console.log('Maxima:',max);
                console.log('Estatus del clima:',desc.green);

            break;

            case 2:
                // busquedas.historial.forEach( (lugar,i) => {
                busquedas.historialCapitalizado.forEach( (lugar,i) => {
                    const idx = `${i+1}.`.green;
                    console.log(`${idx} ${lugar}`);
                });


            break;

            case 0:

            break;
        }

        if(opt !==0) await pausa();

    } while(opt !== 0);



}

main();