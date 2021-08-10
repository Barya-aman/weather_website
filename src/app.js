const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const express = require('express')
// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname,'../public'))
//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath= path.join(__dirname,'../template/views');
const partialsPath= path.join(__dirname,'../template/partials')


const app= express();

const port = process.env.PORT||3000;

//setup handlers engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to server 
app.use(express.static(path.join(publicDirectoryPath)));

//
app.get('',(req,res)=>{
    res.render('index',{
        title:'weather App',
        name: 'Aman Barya',
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:"this is the help page of the website to know more contact admin",
        title:'help',
        name: 'aman barya'

    })

})
app.get('/about',(req,res)=>{
res.render('about',{
    title:'weather App',
        name: 'Aman Barya',
})
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide an address',
        })
    }
    else{
    // res.send({
    //     forcast: 'cloudy',
    //     location : req.query.address,
    // })
   
        geocode(req.query.address,(error,data)=>{
            if(error){
                return res.send({error})
            }
            forecast(data.longitude,data.latitude,(error,forecastdata)=>{
            
                if (error){
                   return res.send({error});
                }
                else{
                    return res.send({
                        forecast: forecastdata,
                        location:data.location,
                        address:req.query.address


                    })
                }
                // console.log(data.latitude , data.longitude)
                // console.log(data.location)
                // console.log(forecastdata)
           
            })
        
        })
    


}

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })

    }

    console.log(req.query);
    res.send({
        products:[]
    })

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:404,
        errorMessage:'Help page not found',
        name: 'aman'
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage:'page not found',
    })
})



app.listen(port,()=>{

    console.log('server is up on port '+port)
})

//app.com
// app.com/home;
// app.com/about;