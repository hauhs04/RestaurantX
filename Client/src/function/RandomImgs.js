export default function RAMDOM_IMGS(){
    var imgs=["https://i.pinimg.com/originals/28/a7/9c/28a79c0ae2405683bb6fbc5d6e995c60.gif",
            "https://i.pinimg.com/originals/4e/bf/f3/4ebff34bb96f7d7b0c157d64bd116085.gif",
            "https://i.pinimg.com/originals/f6/31/37/f631372f995475dd05c04b770dac8096.gif",
            "https://i.pinimg.com/originals/fc/ba/a2/fcbaa255f10157eefb439126a5dc0767.gif",
            "https://i.pinimg.com/originals/ac/fa/51/acfa51bda304618d8575d82d73133141.gif",
            "https://i.pinimg.com/originals/68/b9/09/68b909a67c02ee5cbd785fb52130321e.gif",
            "https://i.pinimg.com/originals/c3/02/8d/c3028d06301337fe2deaa3584215a481.gif"]


    return imgs[Math.floor(Math.random() * imgs.length )]
    
}