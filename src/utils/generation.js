const names = ["Harry","Ross",
"Bruce","Cook",
"Carolyn","Morgan",
"Albert","Walker",
"Randy","Reed",
"Larry","Barnes",
"Lois","Wilson",
"Jesse","Campbell",
"Ernest","Rogers",
"Theresa","Patterson",
"Henry","Simmons",
"Michelle","Perry",
"Frank","Butler",
"Shirley"];

const surnames = [
"Smith",
"Robotson",
"Williams",
"Jones",
"Brown",
"Davis",
"Miller",
"Wilbot",
"Moorelaw",
"Taylor",
"Anderbot",
"Thomas",
"Jackbot",
"White",
"Harris",
"Martin",
"Thompbot",
"Garcia",
"Martinez",
"Robinbot",
"Clark",
"Rodriguez",
"Lewis",
"Lee",
"Walkman",
"Hall",
"Allenkey",
"Young",
"Hernandez",
"King",
"Wright",
"Lopez",
"Chill",
"Scott",
"Greenzone",
"Adams",
"Solder",
"Gonzalez",
"Nelbot",
"Carter",
"Mitchell",
"Perez",
"Roberts",
"Turner",
"Phillips",
"Campbell",
"Parker",
"Evans",
"Edwards",
"2000",
"3000"
];

const specializations = {
    hrDirector: ['Robopsychologist', 'Hippie', 'Robodog walker'],
    rChief: ['Stuff Engineer', 'Laser Engineer', 'Modem'],
    ceo: ['Life coach', 'Suicide assistant', 'Crash dummy'],
    transport: ['Derby driver', 'Speed Psycho', 'Router', 'Butter passer']
}

const hrTypes = ['quality', 'quantity', 'price'];
const rTypes = ['quantityClick', 'quantitySec'];
const ceoTypes = ['price', 'upgDto'];
const transportTypes = ['quantity'];

export const generateRobots = (quantity, quality) => {
    const robots = [];
    const specialTypes = ['hrDirector', 'rChief', 'ceo', 'transport'];
    for (let index = 0; index < quantity; index++) {
        const robot = {};
        const type = specialTypes[Math.floor(Math.random() * specialTypes.length)];
        robot.id = index + 1;
        robot.name = names[Math.floor(Math.random() * names.length)]
        robot.surname = surnames[Math.floor(Math.random() * surnames.length)];
        robot.imageUrl = `https://robohash.org/${robot.name + robot.surname}`;
        robot.desc = 'test';
        robot.specialization = { 
            type,
            title: specializations[type][Math.floor(Math.random() * specializations[type].length)]
        }
        robot.stats = {
            hrDirector: {type: hrTypes[Math.floor(Math.random() * hrTypes.length)], value:  0.2 + (Math.random() * quality) * 0.8},
            rChief: {type: rTypes[Math.floor(Math.random() * rTypes.length)], value:  0.2 + (Math.random() * quality) * 0.8},
            ceo: {type: ceoTypes[Math.floor(Math.random() * ceoTypes.length)], value:  0.2 + (Math.random() * quality) * 0.8},
            transport: {type: transportTypes[Math.floor(Math.random() * transportTypes.length)], value:  0.2 + (Math.random() * quality) * 0.8}
        }
        robot.stats[type].value += Math.random() * quality;
        robot.cost = Math.ceil((quality * 1000) + (Math.random() * (quality * 5000)));
        //robot.cost = 10;
        robots.push(robot);
    }
    return robots;
}