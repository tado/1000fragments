uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.63) - 0.5;
    float rad = 0.42 + 0.12 * sin(t * 3.10 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	{ float fr = length(p); p *= 1.0 + 0.77 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.92, lr * 2.79 + time * -0.46); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.71), field(p, time, 1.42));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.11, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
