const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports ={
    //0. Establecer el modo de trabajo
    mode: 'development',
    //1. Especificando el archivo de entrada
    entry: './client/index.js',
    //2. Especificando la salida
    output: {
        //3. Ruta absoluta de salida
        path: path.join(__dirname, 'public'),
        //4. Nombre de archivo de salida
        filename: 'js/bundle.js',
        //5. Ruta del path publi ( para fines del servidor de desarrollo)
        publicPath: '/'
    }, //incluyendo la configuracion del servidor de desarrollo
    devServer: {
        static: path.join(__dirname, 'public'),
        port: 8085,
        host: 'localhost'
    }, 
    module: {
        rules: [
            {
                //colocando las reglas que utilizara webpack y aplicar el modulo dependiendo del arreglo
                //archivo que detonara la aplicacion 
                test: /\.js $/, 
                exclude: /(node_modules |bower_componets)/,
                use: [
                    {
                        loader:'babel-loader',
                        options:{
                            presets:[
                                [
                                     '@babel/preset-env',
                                    {
                                        'modules': false,
                                        'useBuiltInst': 'usage',
                                        'targets' : {"chrome" : "80"},
                                        'corejs' : 3 
                                    }
                                 ]
                             ],
                             "plugins": [
                                 [
                                    "module-resolver",
                                    {
                                        "root" : ["./"],
                                        "alias" : {
                                            "@client" : "./client"
                                        }
                                    }
                                 ]
                             ]

                        }
                    }
                ]

            },
            {
                test:/\.css$/,
                use: [MiniCssExtractPlugin.loader,'css-loader']
            }

        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: 'styles/app.css'
        })
    ]
}