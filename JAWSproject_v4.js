var workoutDB
var equipmentDB

class WorkoutDatabase{
    constructor(){
        this.workoutDatabase = [];
    }
    addWorkout(reps, sets, workoutName, muscleGroup, equipment, difficulty)
    {
        //add workout
        let workoutExists = false;
        for (let i = 0; i < this.workoutDatabase.length; i++){
            if (workoutName == this.workoutDatabase[i].workoutName){
                workoutExists = true;
            }
        }
        if (workoutExists == false){
            console.log('Adding ' + workoutName + ' to the workout database.');
            const newWorkout = new Workout(workoutName, sets, reps, muscleGroup, equipment, difficulty);
            this.workoutDatabase.push(newWorkout);
            return this.workoutDatabase;
        }
        else{
            console.log('Error: Workout already exists. Workout not added.');
            return this.workoutDatabase;
        }
    }
    removeWorkout(workoutName)
    {
        //remove workout
        for (let i = 0; i < this.workoutDatabase.length; i++){
            if (workoutName == this.workoutDatabase[i].workoutName){
                this.workoutDatabase.splice(i,1);
            }
        }
        return this.workoutDatabase;
    }
getWorkoutDatabase()
    {
        return this.workoutDatabase;
    }
}

class EquipmentDatabase{
    constructor(){
        this.equipmentDatabase = [];
    }
    checkEquipment(equipment){
        let equipmentExists = false;
        for (let i = 0; i < this.equipmentDatabase.length; i++){
            if (equipment == this.equipmentDatabase[i]){
                equipmentExists = true;
            }
        }
        return equipmentExists;
    }
    addEquipment(equipment){
        if(this.checkEquipment(equipment))
            this.equipmentDatabase.push(equipment)
    }
    removeEquipment(equipment)
    {
        //remove workout
        for (let i = 0; i < this.equipmentDatabase.length; i++){
            if (equipment == this.equipmentDatabase[i]){
                this.equipmentDatabase.splice(i,1);
            }
        }
    }
    getEquipmentDatabase()
    {
        if (this.equipmentDatabase == null){ //or NaN
            return 'empty';
        }
        return this.equipmentDatabase;
    }
}

class Workout{
    constructor(name, sets, reps, muscleGroup, equipment, difficulty, instruction = ""){
        this.name = name;
        // this.type = type;
        this.sets = sets;
        this.reps = reps;
        this.muscleGroup = muscleGroup;
        this.equipment = equipment;
        this.difficulty = difficulty;
        this.instruction = instruction;
    }
}

class User{
    constructor(userName, password, intensity, sex, age, weight, heightFt, heightIn, muscleGroupList, equipmentList, difficulty = 0){
        this.userName = userName;
        this.password = password;
        this.intensity = intensity;
        this.sex = sex;
        this.age = age;
        this.weight = weight;
        this.heightFt = heightFt; //feet of height
        this.heightIn = heightIn //inches of height
        this.totalHeightIn + (heightFt * 12); //height in inches
        this.muscleGroupList = muscleGroupList;
        this.equipmentList = equipmentList;
        this.bmi = weight / (this.totalHeightIn*this.totalHeightIn);
        this.difficulty = this.getDifficulty();
        
        this.TableDatabase = new TableDatabase(this.userName);
    }

    getDifficulty(){
        if(this.bmi > 25){
            return 0; //beginner
        }
        else if((this.bmi >= 18) && (this.bmi <= 25)){
            return 1; //amateur
        }
        else{
            return 2; //expert
        }
    }
    generateRandomWorkout(muscleGroupChoice, equipmentList){
        this.muscleGroupChoice = muscleGroupChoice;
        this.workoutDB = workoutDB.getWorkoutDatabase();
        this.equipmentDB = equipmentDB.getEquipmentDatabase();
        let workoutGroupList = [];
        let hasEquipment = false;
        let generatedWorkout = null;
        //cycle through all workouts with muscle group "arms" return a list of it

        for(let i = 0; i < this.workoutDB.length; i++)
        {
            if(this.workoutDB[i].muscleGroup == this.muscleGroupChoice) //works
            {

                if(this.workoutDB[i] != null){
                    //console.log(this.workoutDB[i].name);
                    workoutGroupList.push(this.workoutDB[i]);
                }
            }

        }

        //check if user has the equipment by comparing user equipment list to possible workouts.

        let equipmentWorkoutGroupList = [];
        for(let j = 0; j < this.equipmentList.length; j++){
            for(let k = 0; k < workoutGroupList.length; k++){
                if(workoutGroupList[k].equipment == this.equipmentList[j]){
                    equipmentWorkoutGroupList.push(workoutGroupList[k]);
                    hasEquipment = true;
                }
            }
        }
        //check if user workout is correct difficulty
        this.validWorkoutGroupList = [];
        for(let n = 0; n < equipmentWorkoutGroupList.length; n++){
            if(equipmentWorkoutGroupList[n].difficulty <= this.difficulty){

                this.validWorkoutGroupList.push(equipmentWorkoutGroupList[n]);
            }
        }

        //create random number then insert random number modulo based off array length
        if(hasEquipment){
            this.randomNumber = Math.floor(Math.random() * this.validWorkoutGroupList.length); //generates number (0) to (workout group list length)
            generatedWorkout = this.validWorkoutGroupList[this.randomNumber];
        }
        return generatedWorkout;
    }
    generateDayList(muscleGroupChoice)
    {
        this.muscleGroupChoice = muscleGroupChoice;
        let dayList = [];
        for(let i = 0; i < 3; i++){

            if(this.generateRandomWorkout(this.muscleGroupChoice) != null){
                this.generatedWorkout = this.generateRandomWorkout(this.muscleGroupChoice)
                dayList.push(this.generatedWorkout);
            }
            else{
                dayList.push("plyometrics workout");
            }
        }
        return dayList;
    }
    generateWeekList(){
        let weekList = [];
        let muscleListCounter = 0;
        for(let i = 0; i < 7; i++){
            weekList.push(this.generateDayList(this.muscleGroupList[muscleListCounter]));
            muscleListCounter++;
            if (muscleListCounter == 3){
                muscleListCounter = 0;
            }
        }
        return weekList;
    }

}

class TableDatabase{
    constructor(userName){
        this.userName = userName;
    }
}



class JAWSclient{
    constructor(){
        workoutDB = new WorkoutDatabase()
        equipmentDB = new EquipmentDatabase();
    }
    runMain(){
        console.log('this is the main');
        //main

        //arms example
        workoutDB.addWorkout(3,10,"dumbbell curl", "Arms", "Dumbbell", 0);
        workoutDB.addWorkout(4,10,"bench", "Arms", "Barbell", 0);
        workoutDB.addWorkout(5,10,"barbell curl", "Arms", "Barbell", 0);

        //legs example
        workoutDB.addWorkout(3,10,"squat", "Legs", "Dumbbell", 1);
        workoutDB.addWorkout(4,10,"deadlift", "Legs", "Barbell", 1);
        workoutDB.addWorkout(5,10,"box squat", "Legs", "BarbellAndBox", 1);
    
        //back example
        workoutDB.addWorkout(3,10,"pullups", "Back", "Dumbbell", 2);
        workoutDB.addWorkout(4,10,"bent over rows", "Back", "Dumbbell", 2);
        workoutDB.addWorkout(5,10,"push up rows", "Back", "Dumbbell", 2);

        equipmentDB.addEquipment("Dumbbell");
        equipmentDB.addEquipment("Barbell");
        let lj = new User("lojay", "password1", "easy", "male", "24", "205", "5", "10", ["Arms","Legs","Back"], ["Dumbbell","Barbell"]);
        console.log(lj.generateWeekList());

    }
}

var myClient = new JAWSclient();
myClient.runMain();
