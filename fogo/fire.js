const firePixelsArray = []
const fireWidth = 40
const fireHeight = 40 
const fireColorsPalette =['rgb(7, 7, 7)', 'rgb(31, 7, 7)', 'rgb(47, 15, 7)', 'rgb(71, 15, 7)', 'rgb(87, 23, 7)', 'rgb(103, 31, 7)', 'rgb(119, 31, 7)', 'rgb(143, 39, 7)', 'rgb(159, 47, 7)', 'rgb(175, 63, 7)', 'rgb(191, 71, 7)', 'rgb(199, 71, 7)', 'rgb(223, 79, 7)', 'rgb(223, 87, 7)', 'rgb(223, 87, 7)', 'rgb(215, 95, 7)', 'rgb(215, 95, 7)', 'rgb(215, 103, 15)', 'rgb(207, 111, 15)', 'rgb(207, 119, 15)', 'rgb(207, 127, 15)', 'rgb(207, 135, 23)', 'rgb(199, 135, 23)', 'rgb(199, 143, 23)', 'rgb(199, 151, 31)', 'rgb(191, 159, 31)', 'rgb(191, 159, 31)', 'rgb(191, 167, 39)', 'rgb(191, 167, 39)', 'rgb(191, 175, 47)', 'rgb(183, 175, 47)', 'rgb(183, 183, 47)', 'rgb(183, 183, 55)', 'rgb(207, 207, 111)', 'rgb(223, 223, 159)', 'rgb(239, 239, 199)', 'rgb(255, 255, 255)']
function start() {
createFireDataStructure()
createFireSource()
renderFire()
setIntervalcalculateFirePropagation, 50()
}
function createFireDataStructure(){
const numberOfPixels = fireWidth * fireHeight
for (let i = 0; i < numberOfPixels; i++){
    firePixelsArray[i] = 0
}
}
function calculateFirePropagation(){
        for (let column = 0; column < fireWidth; column++){
            for (let row = 0; row < fireHeight; row++){
              const pixelIndex = column + (fireWidth * row) 
                updateFireIntensityPerPixel(pixelIndex)        
            }
        }
        renderFire()
}
function updateFireIntensityPerPixel(currentPixelIndex) {
    const belowPixelIndex = currentPixelIndex + fireWidth
    if (belowPixelIndex >= fireWidth * fireHeight){
        return
    }
    const decay = Math.floor(Math.random() * 3)
    const belowPixelFireIntensity = firePixelsArray[belowPixelIndex]
    const newFireIntensity = belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0 

    firePixelsArray[currentPixelIndex - decay] = newFireIntensity
}
function renderFire(){
    const debug = false
let html = '<table cellpadding=0 cellspacing=0'
 for (let row=0; row < fireHeight; row++){
     html += '<tr>'
        for (let column = 0; column < fireWidth; column++) {
                const pixelIndex = column + ( fireWidth * row)  
                  const fireIntensity = firePixelsArray[pixelIndex]  
                   if (debug === true) {
                       html+= '<td>'
                       html+= '<div class="pixel-index">${pixelIndex}</div>'
                       html+= fireIntensity
                       html+= '</td>'
                   } else{
                       const color = fireColorsPalette[fireIntensity]
                       const colorString = '${color.r},${color.br}'
                       html+= ',td style="background-color: rgb(${colorString})">'
                       html+= '</td>'
                   }    
            html += '<td>'
          html += '<div class="pixel-index">${pixelIndex}</div>'
            html +='</td>'
        }
     html += '</tr>'
 }
html += '</table>'
    document.querySelector('#fireCanvas').innerHTML = html
}
function createFireSource() {
    for (let column = 0; column <= fireWidth; column++){
        const overflowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overflowPixelIndex - fireWidth) + column

        firePixelsArray[pixelIndex] = 36
    }
}
start()