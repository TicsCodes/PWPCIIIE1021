module.exports ={
    //1. Especificando el archivo de entrada
    entry: './client/index.js',
    //2. Especificando el archivo de salida
    output: {
        path: '/public', //3. Ruta absoluta de salida
        filename: 'bundle.js' //4. Nombre de archivo de salida
    },
    devServer: {
        static: './public'
    }
}