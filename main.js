// main.js

// Initialize the game
require('init');
var einwohner = require('einwohner');
var harvester = require('harvester');
var guard = require('guard');
var builder = require('builder');

module.exports.loop = function () {

   einwohner();

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (Memory.debug) console.log("\t\t\t Prüfe Rolle für Creep: "+creep.name);
        if(creep.memory.role =='harvester') {
            harvester(creep);
        } else  if (creep.memory.role =='builder') {
            builder(creep);
        } else  if (creep.memory.role =='guard') {
           guard(creep);
        }
    }



}
