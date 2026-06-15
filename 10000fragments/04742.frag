uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.04 + sr * 13.92 - t * 4.93 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.98 + t * 1.79 + ph) + sin(p.y * 10.97 - t * 1.79 + ph)
        + sin((p.x + p.y) * 8.41 + t * 1.79 + ph) + sin(length(p) * 17.82 - t * 1.79 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.42, lr * 1.50 + time * 0.54); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.15; p = rot2(0.47) * p; }
	{ p = vec2(atan(p.y, p.x) * 2.84, length(p) * 3.32 - time * 0.59); }
	p = rot2(0.59) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.69);
	float d = d1 * d2;
	vec3 col = palette(d * 1.53 + time * 0.30, vec3(0.46, 0.50, 0.58), vec3(0.35, 0.39, 0.34), vec3(0.72, 0.88, 0.77), vec3(0.55, 0.24, 0.27));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
