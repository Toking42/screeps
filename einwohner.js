module.exports = function() {
    
   if(Memory.debug) console.log("--> Einwohner");
   
   var creepPlan = ['Worker1', 'Worker2', 'Guard1', 'Builder1'];
   
   var population = [0,0,0];
   
   // Check Population
   for (var id in Game.creeps) {
       var creep = Game.creeps[id];
       if (creep.memory.role != undefined) {
       switch (creep.memory.role.substring(0,1)) {
           case "h":
                population[0]++;
            break;
           case "g":
                population[1]++;
            break;
           case "b":
                population[2]++;
            break;
       }
       }

   }
   
if (Memory.debug)  console.log("Population:\tHarvester:"+population[0]+"\tGuards:"+population[1]+"\tBuilder:"+population[2]);
   
   
    for (var spawnpunkt in Game.spawns) {
        if(Memory.debug)     console.log("\t Spawnpunkt: "+Game.spawns[spawnpunkt]);
    
        if (population[0]==0 || population[0] < population[1]*2) {
            if(Memory.debug)     console.log("\t \twir brauchen einen Harvester! ");
            if ( Game.spawns[spawnpunkt].canCreateCreep([WORK, CARRY, MOVE], 'Worker'+population[0], {role : 'harvester'})== OK ) {
              var creepName = Game.spawns[spawnpunkt].createCreep([WORK, CARRY, MOVE], 'Worker'+population[0], {role : 'harvester'});
    
            if(Memory.debug)     console.log("\t CreepWorkerErzeugt: "+creepName);
            }
        } else if (population[1]==0 || population[1] < population[2]*2) {
            if(Memory.debug)     console.log("\t \twir brauchen einen Guardian! ");
            var bauplan = [TOUGH, TOUGH, MOVE, MOVE, ATTACK, ATTACK];
            if (population[1]>=2) bauplan = [TOUGH, TOUGH, MOVE, MOVE, MOVE, RANGED_ATTACK, ATTACK, ATTACK]
            
            if ( Game.spawns[spawnpunkt].canCreateCreep(bauplan, 'Guard'+population[1], {role : 'guard'})== OK ) {
              var creepName = Game.spawns[spawnpunkt].createCreep(bauplan, 'Guard'+population[1], {role : 'guard'});
    
            if(Memory.debug)     console.log("\t CreepGuardErzeugt: "+creepName);
            }
        } else {
            if(Memory.debug)     console.log("\t \twir haben Zeite einen Builder zu bauen ");
            if ( Game.spawns[spawnpunkt].canCreateCreep([WORK, WORK, CARRY, MOVE], 'Builder'+population[2], {role : 'builder'})== OK ) {
              var creepName = Game.spawns[spawnpunkt].createCreep([WORK, WORK, CARRY, MOVE], 'Builder'+population[2], {role : 'builder'});
    
            if(Memory.debug)     console.log("\t CreepBuilderErzeugt: "+creepName);
            }
        }
    
    } // END for   
     if(Memory.debug) console.log("<-- Einwohner");
}
