// motor boat with 2 motors
//import p5 from './p5-wrapper.js';
import { Vertices } from 'matter-js';

export default class MotorBoat {
    constructor(width, height, forwardKey, reverseKey, leftKey, rightKey, forwardSpeed=0.0009, reverseSpeed=-0.0004) {

        // passed to object instance parameters ------

        // physical size
        this.width = height; //******************
        this.height = width;
                                        
        // keyboard keys
        this.forwardKey = forwardKey;
        this.reverseKey = reverseKey;
        this.leftKey = leftKey;
        this.rightKey = rightKey;

        // -------- speeds ------
        
        // forward speed constant
        this.forwardSpeed = forwardSpeed;
        // reverse speed constant
        this.reverseSpeed = reverseSpeed;

        // speed variable
        this.forceSize = 0.000;

        // --------------------------------------------

        // store instance of rigid body here
        this.body;  

        this.vertices;
        
       
        // methods check these attributes to actually move the boat
        this.moveForward = false;
        this.moveBackward = false;

        // angle of motor - left and right
        this.motorAngle1 = 0;
        this.motorAngle2 = 0;
    }
    
    // pass a system variable that contains the code of the last key pressed
    checkForPress(keyCode) {
        if (keyCode === this.forwardKey) {
            this.forceSize = this.forwardSpeed; // make this an attribute
        };
        if (keyCode === this.reverseKey) {
            this.forceSize = this.reverseSpeed; // make this an attribute
        };

        if (keyCode === this.leftKey) {
            if (this.motorAngle1 === -0.5) {
                this.motorAngle1 += 1;
                this.motorAngle2 += 1;

            } else if (this.motorAngle1 === 0) {
                this.motorAngle1 += 0.5
                this.motorAngle2 += 0.5
            }
        };
        if (keyCode === this.rightKey) {
            if (this.motorAngle1 === 0.5) {
                this.motorAngle1 -= 1;
                this.motorAngle2 -= 1;
            } else if (this.motorAngle1 === 0) {
                this.motorAngle1 -= 0.5;
                this.motorAngle2 -= 0.5;
            }
        };
    }
    // pass a system variable that contains the code of the last key released
    checkForRelease(keyCode) {
        console.log('checkForRelease()...')
        if (keyCode === this.forwardKey) {
            this.forceSize = 0;
        };
        if (keyCode === this.reverseKey) {
            this.forceSize = 0;
        };
        if (keyCode === this.leftKey) {
            this.motorAngle1 = 0;
            this.motorAngle2 = 0;
        };
        if (keyCode === this.rightKey) {
            this.motorAngle1 = 0;
            this.motorAngle2 = 0;
        };
    }


    // gets angle of force depending on 
    // angle of hull and angle of motor
    getForcePosition() {
        console.log('getForcePosition()...')
    
        let force =       { x:0, y:0 };
        let motorOffset = { x:0, y:0 };
        let forceVector = { x:0, y:0 }

        // angle combination of hull and motor angles
        let angle = this.body.angle + this.motorAngle1 + this.motorAngle2;

        force = {
            x: Math.cos(angle) * this.forceSize,
            y: Math.sin(angle) * this.forceSize
        };
        // no idea what this does
        motorOffset = {
            x: Math.cos(this.body.angle) * -20, // back of boat along its axis
            y: Math.sin(this.body.angle) * -20
        };

        forceVector = {
            x: this.body.position.x + motorOffset.x,
            y: this.body.position.y + motorOffset.y
        };
        // return -> rigid body, direction of force, size of force
        
        return [this.body, forceVector, force];
    }
    
    // update visual drawing of this object
    // based off of location of the rigid body of the instance
    // pass games instance of p5 as parameter to method
    showDrawing(p) {
        console.log('showDrawing()...')

        p.push();
        p.translate(this.body.position.x, this.body.position.y);
        p.rotate(this.body.angle);
        p.fill(220, 60, 60);
        //p.noStroke();

        p.beginShape();
        for (let v of this.vertices) {
            p.vertex(v.x, v.y);
        }
        p.endShape(p.CLOSE);


        // motors
        /*

        |--------------\
        -                \
        |                  /
        -                /
        |--------------/
        divide width by thirds for motor placement
        */


        // motor 1 --
        p.push();

        // Find location of back center
        const backX = (this.vertices[0].x + this.vertices[4].x) / 2;
        const backY = (this.vertices[0].y + this.vertices[4].y) / 2;

        // Move to back position
        p.translate(backX-4, backY - this.width / 5); 
        // -4 makes the motor hand off the back rather than center on the back

        // Rotate motor by motorAngle
        p.rotate(this.motorAngle1);

        // Draw motor rectangle
        p.fill(50, 50, 50);
        p.rectMode(p.CENTER);
        p.rect(0, 0, this.height / 3.9, this.width / 4.3);

        p.pop();

        // motor 2 --
        p.push();

        // Find location of back center again
        const backX2 = (this.vertices[0].x + this.vertices[4].x) / 2;
        const backY2 = (this.vertices[0].y + this.vertices[4].y) / 2;

        // Move to second motor position (right side, opposite the first motor)
        p.translate(backX2 - 4, backY2 + this.width / 5); // +4 positions second motor opposite side

        // Rotate by motorAngle2
        p.rotate(this.motorAngle2);

        // Draw second motor rectangle
        p.fill(50, 50, 50);
        p.rectMode(p.CENTER);
        p.rect(0, 0, this.height / 3.9, this.width / 4.3);

        p.pop();


        // person 
        p.push(); 
        p.noStroke();
        p.translate(0, -4); 
        p.fill(255, 203, 164); 
        p.ellipse(0, 0, 10, 10); 
        
        p.pop();

        // windshield
        p.push()
        p.noStroke();
        p.rectMode(p.CENTER);
        p.translate(this.width/2 + 1, 0); // moves windshield forward
        p.fill(173, 216, 230, 150); // color
        p.rect(0, 0, 1.5, this.width - 2); // size
        
        p.pop()


        p.pop();
    }

    // pass Matter.Body module to method
    createBody(bodies) {
        // Define original shape (front points right)
        this.vertices = [
            { x: 0, y: 0 },
            { x: this.height, y: 0 },
            { x: (this.height) + (this.height/4.3), y: this.width / 2 }, // bow
            { x: this.height, y: this.width },
            { x: 0, y: this.width }
        ];

        // Get centroid to center the shape
        const centroid = Vertices.centre(this.vertices);

        // Offset vertices so shape is centered at (0,0)
        this.vertices = this.vertices.map(v => ({
            x: v.x - centroid.x,
            y: v.y - centroid.y
        }));

        // Create the body using centered vertices
        this.body = bodies.fromVertices(200, 200, [this.vertices], {
            friction: 0.0001,
            frictionAir: 0.05
        }, true);
    }

    getCentroid(vertices) {
        let xSum = 0;
        let ySum = 0;
        for (let v of vertices) {
            xSum += v.x;
            ySum += v.y;
        }
        return {
            x: xSum / vertices.length,
            y: ySum / vertices.length
        };
    }

}