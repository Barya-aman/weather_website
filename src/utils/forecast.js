const request = require('request')

const forecast=(latitude,longitude,callback)=>
{
    const url= "http://api.weatherstack.com/current?access_key=59eb42018a0640d1f63d675b5e8c3d92&query="+longitude+","+latitude;

    request({ url: url, json:true},(error,response)=>{

        if (error){
            callback("unable to connect to weather services!",undefined);
        }else if(response.body.error){
            callback('unable to find location',undefined);
        }else{
    
            callback(undefined,response.body.current.weather_descriptions[0]+". it is currently " + response.body.current.temperature + " C and it feels like " +response.body.current.feelslike+" C and the humidity is "+response.body.current.humidity);
        }
     })
}

module.exports =forecast