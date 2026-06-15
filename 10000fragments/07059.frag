uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.83) - 0.5;
    float rad = 0.40 + 0.12 * sin(t * 3.23 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.28 + t * 5.97 + ph) + sin(p.y * 8.53 - t * 3.19 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.73;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.40; p = rot2(0.86) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.82, lr * 2.87 + time * 0.51); }
	{ p = vec2(atan(p.y, p.x) * 2.79, length(p) * 5.37 - time * 0.15); }
	p = fract(p * 2.41) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.04);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.71 + time * 0.20, vec3(0.60, 0.45, 0.55), vec3(0.33, 0.45, 0.43), vec3(1.32, 1.35, 0.72), vec3(0.61, 0.86, 0.87));
	col = fract(col * 2.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
