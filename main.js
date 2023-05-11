const cardWrapper = document.querySelector(".cardWrapper")
        let G7Arr = 0
        let G4Arr = 0
        let G2Arr = 0
        let wrongAnswer = []

const cardComponent =(item)=>`
<div class="equCard item${item.id}" data-id="${item.id}" id="${item.location}" draggable="true">
        <h2>${item.name}</h2>
        <p>${item.quantity} St</p>
        <button class="InfoBtn" data-id="${item.id}">More information</button>
    </div>    
`
const fetching = async() =>{
    let response = await fetch("./equipment.json")
    let data =  await response.json()
    return data
}
let infoCardComponent= (info)=>`
<div class="infoCard">
<h2>${info.name}</h2>
<h3>${info.quantity}</h3>
<ul>
    <li>${info.pre_flightCheck}</li>
</ul>
</div>
`


fetching()
.then(
    data=>{
        cardWrapper.innerHTML= data.map(cardComponent). join("")
        const equCard = document.querySelectorAll(".equCard")
        const infoBtn = document.querySelectorAll(".InfoBtn")

       
const infoBtnFunc=(e)=>{
    const infoContainer = document.querySelector(".infoContainer")
    
    data.forEach(dataId=>{
        let uniqueId= e.target.getAttribute("data-id")
        if(dataId.id==uniqueId){
            infoContainer.innerHTML=infoCardComponent(dataId)
        }
    })}
        


        function handleDragStart(e) {
            this.style.opacity = '0.4';

            dragSrcEl = e.target;
            dragSrcElDataId = this.getAttribute("data-id")


            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', this.innerHTML); 

          }
          
          function handleDragEnd(e) {
            this.style.opacity = '1';
    
          }
          function handleDragOver(e) {
            e.preventDefault();
            e.target.style.opacity="0.5"
            return false;
          }
        
          function handleDragEnter(e) {
            this.classList.add('over');
          }
        
          function handleDragLeave(e) {
            this.classList.remove('over');
            e.target.style.opacity="1"

          }
          function handleDrop(e) {
            // e.stopPropagation(); // stops the browser from redirecting.
            e.target.style.opacity="1"
            if (dragSrcEl !== this) {
                // dragSrcEl.innerHTML = this.innerHTML;
                this.innerHTML += `<div class="equCard" draggable="true">${e.dataTransfer.getData('text/html')}</div>`
                dragSrcEl.style.display="none"                
                // console.log(dragSrcEl.classList[1])
                

                console.log(this.classList)
               

                if(this.id==dragSrcEl.id || dragSrcEl.id.includes(this.id)){

                    this.classList.forEach(sameClass =>{
                        if(sameClass==(dragSrcEl.classList[1])){
                            this.lastChild.style.background="orange"
                            console.log(sameClass)
                            }else{
                            G7Arr++
                            this.lastChild.style.background="limegreen"
                             this.classList.add(dragSrcEl.classList[1])
                        }
                    })
                // }else if(this.id==dragSrcEl.id || dragSrcEl.id.includes(this.id)){
                //     G4Arr++
                //     this.lastChild.style.background="limegreen"
                // }else if(this.id==dragSrcEl.id || dragSrcEl.id.includes(this.id)){
                //     G2Arr++
                //     this.lastChild.style.background="limegreen"
                }
                else{
                    wrongAnswer.push(dragSrcEl.innerText)
                    this.lastChild.style.background="red"
                    this.innerHTML += dragSrcEl.id
                }
              }
            
              return false;

          }
       
        
        //   let items = document.querySelectorAll('.cardWrapper .equCard');
        // items.forEach(function (item) {
        //   item.addEventListener('dragstart', handleDragStart);
        //   item.addEventListener('dragend', handleDragEnd);
        // });
        equCard.forEach(function(card){
            card.addEventListener('dragstart', handleDragStart);
            card.addEventListener('dragover', handleDragOver);
            card.addEventListener('dragenter', handleDragEnter);
            card.addEventListener('dragleave', handleDragLeave);
            card.addEventListener('dragend', handleDragEnd);
            card.addEventListener('drop', handleDrop);
        })
        let planeSpace = document.querySelectorAll(".guessBox")
        planeSpace.forEach(box=>{
            box.addEventListener('dragstart', handleDragStart);
            box.addEventListener('dragover', handleDragOver);
            box.addEventListener('dragenter', handleDragEnter);
            box.addEventListener('dragleave', handleDragLeave);
            box.addEventListener('dragend', handleDragEnd);
            box.addEventListener("drop", handleDrop)
        })

        infoBtn.forEach(btn=>{
            btn.addEventListener("click",infoBtnFunc)
        })
          
    })