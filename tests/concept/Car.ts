class Car{

    brand:string
    color:string
    speed:number

    constructor(brand:string, color:string){
        this.brand=brand
        this.color =color
        this.speed=0

    }

    start(){
        console.log(`${this.brand} is starting`);
    }

    accelerate(amount:number){

        this.speed+=amount
        console.log(`${this.brand} is now going ${this.speed} km/h`);

    }

}

const myCar=new Car("Toyota","Red")
myCar.start()
myCar.accelerate(60)

const anotherCar = new Car('BMW', 'Blue')
anotherCar.start()
anotherCar.accelerate(100)