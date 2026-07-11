uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.84 * sin(mf + 3.0) + ph), cos(t * 1.84 * cos(mf + 3.0) + ph));
        ms += 0.054 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.71) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 1.93 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.82;
	p = fract(p * 2.41) - 0.5;
	p *= 3.17;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.06, lr * 1.75 + time * -0.57); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.26);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.79 + time * 0.22, vec3(0.59, 0.60, 0.59), vec3(0.34, 0.32, 0.50), vec3(1.09, 1.24, 1.28), vec3(0.46, 0.17, 0.71));
	col = mod(col * 1.87, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
