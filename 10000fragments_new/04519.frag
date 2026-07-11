uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.49, 0.0)) * 37.60 - t * 6.33 + ph);
    float mb = sin(length(p + vec2(0.49, 0.0)) * 33.03 - t * 3.32 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.65;
	p = (floor(p * 18.4) + 0.5) / 18.4;
	p = fract(p * 2.95) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.92), field(p, time, 1.83));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
