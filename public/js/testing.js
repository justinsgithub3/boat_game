import p5 from './p5-wrapper.js';

export default function test_function() {
    new p5((p) => {
      p.setup = () => {
        p.createCanvas(1000, 700);
      }
      p.draw = () => {
        p.background(30, 80, 160)
      }
    });
    console.log('this is called from test function inside testing.js module. Success!');
}