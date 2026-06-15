uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.52) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 3.27 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.20 + sr * 11.24 - t * 1.39 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.03;
	{ p = vec2(atan(p.y, p.x) * 2.17, length(p) * 4.46 - time * 0.17); }
	p = fract(p * 2.80) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.05, lr * 2.06 + time * 0.46); }
	{ float fr = length(p); p *= 1.0 + -0.74 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.11);
	float d = d1 + d2;
	vec3 col = palette(d * 0.56 + time * 0.16, vec3(0.42, 0.54, 0.57), vec3(0.47, 0.43, 0.44), vec3(1.25, 0.75, 1.08), vec3(0.17, 0.36, 0.95));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
