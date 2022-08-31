const express = require('express')

const { Router } = express
const logger = require('../utils/log4').getLogger("error")

const router = Router()

router.get('/randoms', async(request,response)=>{
  try{

    const cant= request.query.cant || 10e7

    const arrayNumRandmsCoincidence = calculo(cant)

    return response.send(arrayNumRandmsCoincidence)

  } catch(error){
    logger.error(error)
    return response.status(500).json({errors:[error]})
  }
})


const calculo = (cant) =>{
  let numRandoms = []
  for(i=1; i<=cant; i++){
    numRandoms.push(Math.floor(Math.random() * 999) + 1);
  }
  let numRandomsSort = [...numRandoms].sort()
  let arrayNumRandmsCoincidence = []
  let coincidence = 1    
  
  numRandomsSort.forEach((number,index) =>{
    if(numRandomsSort[index+1] === number){
      coincidence++
    }else{
      let obj = {number,coincidence}
      arrayNumRandmsCoincidence.push(obj)
      coincidence = 1
    }
  })

  return arrayNumRandmsCoincidence;

}

module.exports = router;