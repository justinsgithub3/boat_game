//import p5 from './p5-wrapper.js';
import { Vertices } from 'matter-js';

export default class CargoShip {
    constructor(width, height, forwardKey, reverseKey, leftKey, rightKey, forwardSpeed=0.0009, reverseSpeed=-0.0002) {

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
        this.motorAngle = 0;
    }
    
    // pass a system variable that contains the code of the last key pressed
    checkForPress(keyCode) {
        console.log(keyCode)
        if (keyCode === this.forwardKey) {
            this.forceSize = this.forwardSpeed; // make this an attribute
        };
        if (keyCode === this.reverseKey) {
            this.forceSize = this.reverseSpeed; // make this an attribute
        };

        if (keyCode === this.leftKey) {
            if (this.motorAngle === -0.9) {
                this.motorAngle += 1;
            } else if (this.motorAngle === 0) {
                this.motorAngle += 0.9
            }
        };
        if (keyCode === this.rightKey) {
            if (this.motorAngle === 0.9) {
                this.motorAngle -= 1;
            } else if (this.motorAngle === 0) {
                this.motorAngle -= 0.9;
            }
        };
    }
    // pass a system variable that contains the code of the last key released
    checkForRelease(keyCode) {
        if (keyCode === this.forwardKey) {
            this.forceSize = 0;
            console.log('forward key released')
        };
        if (keyCode === this.reverseKey) {
            this.forceSize = 0;
            console.log('reverse key released')
        };
        if (keyCode === this.leftKey) {
            this.motorAngle = 0;
        };
        if (keyCode === this.rightKey) {
            this.motorAngle = 0;
        };
    }


    // gets angle of force depending on 
    // angle of hull and angle of motor
    getForcePosition() {
    
        let force =       { x:0, y:0 };
        let motorOffset = { x:0, y:0 };
        let forceVector = { x:0, y:0 }

        // angle combination of hull and motor angles
        let angle = this.body.angle + this.motorAngle;

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

        p.push();
        p.translate(this.body.position.x, this.body.position.y);
        p.rotate(this.body.angle);
        p.fill(250, 249, 246);
        //p.noStroke();

        p.beginShape();
        for (let v of this.vertices) {
            p.vertex(v.x, v.y);
        }
        p.endShape(p.CLOSE);

        //p.push();

        // Find location of back center
        const backX = (this.vertices[0].x + this.vertices[4].x) / 2;
        const backY = (this.vertices[0].y + this.vertices[4].y) / 2;

        /*
        // Move to back position
        p.translate(backX+5, backY); 
        // -4 makes the motor hand off the back rather than center on the back

        // Rotate motor by motorAngle
        p.rotate(this.motorAngle);

        // Draw motor rectangle
        p.fill(0);
        p.rectMode(p.CENTER);
        p.rect(0, 0, this.height / 3.22, 5);

        p.pop();
        */

        // helm ----
        p.push();
        p.rectMode(p.CENTER);
        p.fill(255, 255, 255)
        // re-use previously defined constansts of the stern
        // location
        p.translate(backX + this.height/10 ,0)
        // size
        p.rect(0, 0, this.height/5, this.width + this.width/5);
        p.pop();
        p.push();
        p.rectMode(p.CENTER);
        p.fill(255, 255, 255)
        // re-use previously defined constansts of the stern
        // location
        p.translate(backX + this.height/8 ,0)
        // size
        p.rect(0, 0, this.height/4.5, this.width/2);
        p.pop();

        // cargo
        const center = this.width / 2;
        const containerLength = this.height/2;
        const containerWidth = this.width/6;
        const storageLength = this.height - this.height/5;
        const storageWidth = this.width - this.width/7;

        // first just draw the storage area
        p.push();
        p.rectMode(p.CENTER);
        p.fill(0, 0, 0)
        // re-use previously defined constansts of the stern
        // location
        p.translate(this.height/14, 0)
        // size
        p.rect(0, 0, storageLength, storageWidth);
        p.pop();

        p.pop();
    }

    // pass Matter.Body module to method
    createBody(bodies) {
        // Define original shape (front points right)
        this.vertices = [
            { x: 0, y: 0 },
            { x: this.height, y: 0 },
            { x: (this.height) + (this.height/9), y: this.width / 2 }, // bow
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
        this.body = bodies.fromVertices(200, -200, [this.vertices], {
            friction: 0.5,
            frictionAir: 0.01
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