## Clone
``git clone https://github.com/mazinsafadi/StockProject.git``

# Setting up Python Django and Angular 8 project

To simplify things when taking a fresh copy from master branch do the following from the project root folder

## setup-env.bat

## install-all.bat

## run.bat

## Under ``frontend`` folder Install all dependencies 
`npm i`

## Build Angular 8 project and keep watching changes, under ``frontend`` folder. The build artifacts will be automatically transferred to django `static/` directory.
`npm i build`
<br>OR<br>
`ng build --watch true --prod false --output-path ../myapp/static/` 


now all set and the service is up and running