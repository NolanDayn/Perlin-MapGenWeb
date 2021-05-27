//Functions for generating perlin noise from a grid base on wikipedia perlin
//example code modified to run in javascript. Also includes smoothstep

function perlin_noise(x,y){
    //Determine grid cell quads
    var x0 = Math.floor(x);
    var x1 = x0 + 1
    var y0 = Math.floor(y)
    var y1 = y0 + 1

    //determine interpolation weights
    let sx = 0.707//x1 - x;
    let sy = 0.707//y1 - y;

    // Interpolate between grid point gradients
    n0 = dotGridGradient(x0, y0, x, y);
    n1 = dotGridGradient(x1, y0, x, y);
    ix0 = interpolate(n0, n1, sx);

    n0 = dotGridGradient(x0, y1, x, y);
    n1 = dotGridGradient(x1, y1, x, y);
    ix1 = interpolate(n0, n1, sx);
    

    intensity = interpolate(ix0, ix1, sy);

    return intensity;
}

function dotGridGradient(x,y, ix, iy){
    gradient = randomGradient(ix,iy)
    // Compute the distance vector
    let dx = x - ix;
    let dy = y - iy;
    return (dx*gradient[0] + dy*gradient[1]);
    return 
}

function interpolate(a0, a1, w){
    return (a1 - a0) * w + a0;
} 

/* Create random direction vector
*/
function randomGradient( ix, iy) {
    // Random float. No precomputed gradients mean this works for any number of grid coordinates
    random = Math.floor(Math.random()*2920) * Math.sin(ix * 21942 + iy * 171324 + 8912) * Math.cos(ix * 23157 * iy * 217832 + 9758);
    return [ Math.cos(random), Math.sin(random)];
}