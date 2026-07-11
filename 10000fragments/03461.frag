uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.99) - 0.5;
    float rad = 0.25 + 0.12 * sin(t * 3.24 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.70;
	{ float fr = length(p); p *= 1.0 + 0.34 * fr * fr; }
	p = abs(p) - 0.46;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.07, lr * 1.71 + time * -0.10); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.64), field(p, time, 1.27));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.60);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
