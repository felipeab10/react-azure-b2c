import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
    colors:{
        gray:{
          "950" : "#121214",  
          "900" : "#181B23",  
          "850" : "#202024",   
          "800" : "#1F2029", 
          "750" : "#26262b", 
          "700" : "#353646",  
          "600" : "#4B4D63",  
          "500" : "#616480",  
          "400" : "#797D9A",  
          "300" : "#9699B0",  
          "200" : "#B3B5C6",  
          "100" : "#D1D2DC",  
          "50" : "#EEEEF2",  
        },
        blue:{
            "900" :"#3A60D0",
            "800" :"#3e6ce0",
        }
    },
    fonts:{
        heading:'Roboto',
        body:'Roboto'
    },
    styles: {
        global:{
            body:{
                bg: 'gray.900',
                color:'gray.50'
            }
        }
    }
})
