import { FirstPage } from "./category.js";

let categories=new FirstPage

export class SearchPage{
    constructor()

    {   

        $('#searchLink').click(function () {
            $('#CategorySection').addClass('d-none')
            $('.areaSection').addClass('d-none')
            $('.IngreSection').addClass('d-none')
            $('.contactSection').addClass('d-none')
            $('.seaech').removeClass('d-none')
        })
        this.categorySecrch("beef")
        this.letterInput=document.getElementById('letterInput')
        this.searchPlace=document.getElementById('conayin')
        this.searchInput=document.getElementById('nameSearchInput')
        this.searchInput.addEventListener('keyup', () => {
            console.log(this.searchInput.value);
            this.categorySecrch(this.searchInput.value??"beef")
        
        })
        console.log(this.searchInput.value);
        this.letterInput.addEventListener('keyup', () => {
            console.log(this.letterInput.value);
            
            this.Secrchletter(this.letterInput.value)
        
        })
        
        
    }
    
    async categorySecrch(cateoryName)
    {
        let response=await this.fetchApi(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cateoryName}`)
        
        let x=""
        let dataList = response.meals
        
            for (let i = 0; i < 20 ; i++) {
            
            x += `<div class="col-12 col-sm-6 col-md-3 ccc justify-content-center  rounded p-5   ">
            <div class=" position-relative  ">
            <img class="w-100  rounded   bg-danger"  src=${dataList[i].strMealThumb} alt="">
            <div id="rFactor[${i}]"  class="hoverdiv  rounded   text-center   "><h6 class="m-5">${dataList[i].strMeal}<h6/>
            </div>
            </div></div>`
            
        }
        this.searchPlace.innerHTML = x
        for (let i = 0; i < 20; i++) {
            
            let d = document.getElementById(`rFactor[${i}]`)
            
            d.addEventListener("click", ()=> {
                categories.Instructions(dataList[i].strMealThumb,dataList[i].strMeal)
                
            })
        
        }
    }
    async Secrchletter(cateoryName)
    {
        let response=await this.fetchApi(`https://www.themealdb.com/api/json/v1/1/search.php?f=${cateoryName}`)
        
        let x=""
        let dataList = response.meals
        
            for (let i = 0; i < 20; i++) {
            
            x += `<div class="col-12 col-sm-6 col-md-3 ccc justify-content-center  rounded p-5   ">
            <div class=" position-relative  ">
            <img class="w-100  rounded   bg-danger"  src=${dataList[i].strMealThumb} alt="">
            <div id="zFactor[${i}]"  class="hoverdiv  rounded   text-center   "><h6 class="m-5">${dataList[i].strMeal}<h6/>
            </div>
            </div></div>`
            
        }
        this.searchPlace.innerHTML = x
        for (let i = 0; i < dataList.length; i++) {
            
            let d = document.getElementById(`zFactor[${i}]`)
            
            d.addEventListener("click", ()=> {
                categories.Instructions(dataList[i].strMealThumb,dataList[i].strMeal)
                
            })
        
        }
    }
    async fetchApi(Api){
        let response=await fetch(Api)
        let result=await response.json()
        return result
    }

        
        
    
}