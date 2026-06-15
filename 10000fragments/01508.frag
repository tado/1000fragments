uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.06 + t * 2.89 + ph) + sin(p.y * 4.39 - t * 2.89 + ph)
        + sin((p.x + p.y) * 5.61 + t * 2.89 + ph) + sin(length(p) * 11.09 - t * 2.89 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.57, t * 1.43 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.51; p = rot2(1.34) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.54, lr * 1.31 + time * -0.49); }
	{ float fr = length(p); p *= 1.0 + 0.69 * fr * fr; }
	p = rot2(p.y * 3.96 + time * 0.17) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.72);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.65 + time * 0.12, vec3(0.43, 0.55, 0.46), vec3(0.35, 0.48, 0.40), vec3(1.18, 1.26, 1.25), vec3(0.01, 0.93, 0.74));
	col = mod(col * 2.26, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
