uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.72) - 0.5;
    float rad = 0.29 + 0.12 * sin(t * 0.65 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.64;
	{ float fr = length(p); p *= 1.0 + 0.64 * fr * fr; }
	p = fract(p * 2.75) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.83, lr * 1.05 + time * -0.38); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.01), field(p, time, 2.02));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
