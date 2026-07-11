uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.65 + vec2(t * 2.01, -t * 2.01) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.07) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 1.62 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.18;
	{ float fr = length(p); p *= 1.0 + -0.29 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.10, lr * 1.37 + time * 0.62); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.29);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.58 + time * 0.14, vec3(0.47, 0.46, 0.53), vec3(0.32, 0.32, 0.37), vec3(1.38, 0.95, 0.93), vec3(0.64, 0.30, 0.21));
	col = mod(col * 2.55, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
