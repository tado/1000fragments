uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.60) - 0.5;
    float rad = 0.39 + 0.12 * sin(t * 2.49 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.79 + t * 2.39 + ph) + sin(p.y * 7.16 - t * 2.39 + ph)
        + sin((p.x + p.y) * 3.03 + t * 2.39 + ph) + sin(length(p) * 17.41 - t * 2.39 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.07;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.32, lr * 2.92 + time * -0.59); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.36; p = rot2(1.30) * p; }
	{ float fr = length(p); p *= 1.0 + 0.72 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.82, length(p) * 2.65 - time * 0.21); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.36);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.89 + time * 0.14, vec3(0.58, 0.57, 0.57), vec3(0.47, 0.42, 0.35), vec3(0.73, 0.95, 1.03), vec3(0.09, 0.60, 0.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
