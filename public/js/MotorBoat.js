//import p5 from './p5-wrapper.js';

export default class MotorBoat {
    constructor(width, height, forwardKey, reverseKey, leftKey, rightKey) {

        // passed to object instance parameters ------

        // physical size
        this.width = width;
        this.height = height;
                                        
        // keyboard keys
        this.forwardKey = forwardKey;
        this.reverseKey = reverseKey;
        this.leftKey = leftKey;
        this.rightKey = rightKey;
        
        // --------------------------------------------

        // store instance of rigid body here
        this.body;  

        // speed
        this.forceSize = 0.000;
       
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
            this.forceSize = 0.0009; // make this an attribute
        };
        if (keyCode === this.reverseKey) {
            this.forceSize = -0.0002; // make this an attribute
        };

        if (keyCode === this.leftKey) {
            if (this.motorAngle === -0.5) {
                this.motorAngle += 1;
            } else if (this.motorAngle === 0) {
                this.motorAngle += 0.5
            }
        };
        if (keyCode === this.rightKey) {
            if (this.motorAngle === 0.5) {
                this.motorAngle -= 1;
            } else if (this.motorAngle === 0) {
                this.motorAngle -= 0.5;
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
        // Hull
        // coordinates regard center of object... not sure which one exactly
        p.rectMode(p.CENTER);

        p.push();

        // draw hull at the current location of this instances rigid bodies center
        p.translate(this.body.position.x, this.body.position.y);
        // rotate drawing relative to rigid bodies angle
        p.rotate(this.body.angle);
        p.fill(220, 60, 60); // color
        p.rect(0, 0, this.width, this.height); // size

        // Motor
        p.push()
        p.translate(-this.width/2 - 4, 0);     // move motor to back of hull
        // rotate motor drawing. Rotates relative to parent rectangle drawing ^ (the hull)
        p.rotate(this.motorAngle);  
        p.fill(0); // color
        p.rect(0, 0, 15, 10); // size

        p.pop();
        p.pop();
    }

    // pass Matter.Body module to method
    createBody(bodies) {
        // place boat at 0, 0 because placement of boat is not this methods job
        this.body = bodies.rectangle(100, 100, this.width, this.height, {friction : .9, frictionAir : .05}); // verfied with matter-js docs -> width, height.
                                                                        // move friction outside of here
    }
}