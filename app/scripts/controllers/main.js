'use strict';

/**
 * @ngdoc function
 * @name neo4jHackatonApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the neo4jHackatonApp
 */
angular.module('neo4jHackatonApp')
    .controller('MainCtrl', [function () {
        var self = this;

        // Create a driver instance, for the user neo4j with password neo4j.
        var driver = neo4j.v1.driver('bolt://localhost', neo4j.v1.auth.basic('neo4j', 'root'));
        // Create a session to run Cypher statements in.
        // Note: Always make sure to close sessions when you are done using them!
        var session = driver.session();

        var airports = [];

        self.getAirports = function () {
            session.run("OPTIONAL MATCH (a:Airport)<-[:ORIGIN]-(d:Flight {month:\"November\"})-[:DELAYED_BY]-(:Cause) WITH a, d OPTIONAL MATCH (a)<-[:ORIGIN]-(c:Flight {month:\"November\"})-[:CANCELLED_BY]-(:Cause) RETURN a.name as name, count(d) as delay, count(c) as canceled, count(d) * 0.5 + count(c) * 2 as if ORDER BY if desc").subscribe({
                onNext: function (r) {
                    var tab = document.getElementById("tab");
                    var tr = document.createElement('tr');
                    var td = document.createElement('td');
                    td.appendChild(document.createTextNode(r._fields[0]));
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.appendChild(document.createTextNode(r._fieldLookup.delay));
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.appendChild(document.createTextNode(r._fieldLookup.canceled));
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.appendChild(document.createTextNode(r._fields[3]));
                    tr.appendChild(td);
                    tab.appendChild(tr);

                },
                onCompleted: function () {
                    session.close();
                },
                onError: function (error) {
                    console.log('ERRORED: ' + error);
                }
            })
        };

        self.getAirports();


        // Run a Cypher statement, reading the result in a streaming manner as records arrive:
        /*session
            .run('MERGE (alice:Person {name : {nameParam} }) RETURN alice.name', {
                nameParam: 'Alice'
            })
            .subscribe({
                onNext: function (record) {
                    console.log('AAA');
                    console.log(record._fields);
                },
                onCompleted: function () {
                    // Completed!
                    session.close();
                },
                onError: function (error) {
                    console.log(error);
                }
            });
*/
        // or
        // the Promise way, where the complete result is collected before we act on it:
        /*session
            .run('MERGE (james:Person {name : {nameParam} }) RETURN james.name', {
                nameParam: 'James'
            })
            .then(function (result) {
                result.records.forEach(function (record) {
                    console.log('BBB');
                    console.log(record._fields);
                });
                // Completed!
                session.close();
            })
            .catch(function (error) {
                console.log(error);
            });*/

        //run statement in a transaction
        /* var tx = session.beginTransaction();
         tx.run('MERGE (bob:Person {name : {nameParam} }) RETURN bob.name', {
                 nameParam: 'Bob'
             })
             .subscribe({
                 onNext: function (record) {
                     console.log('CCC');
                     console.log(record._fields);
                 },
                 onCompleted: function () {
                     // Completed!
                     session.close();
                 },
                 onError: function (error) {
                     console.log(error);
                 }
             });

         //decide if the transaction should be committed or rolled back
         var success = false;

         if (success) {
             tx.commit()
                 .subscribe({
                     onCompleted: function () {
                         // Completed!
                     },
                     onError: function (error) {
                         console.log(error);
                     }
                 });
         } else {
             //transaction is rolled black and nothing is created in the database
             console.log('rolled back');
             tx.rollback();
         }*/
    }]);