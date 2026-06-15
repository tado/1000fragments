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
    float petal = 0.56 + 0.22 * cos(sa * 7 + t * 0.61 + ph);
    v = sin((sr - petal) * 14.10);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.06 + t * 4.40 + ph) + sin(p.y * 10.24 - t * 4.40 + ph)
        + sin((p.x + p.y) * 6.17 + t * 4.40 + ph) + sin(length(p) * 15.84 - t * 4.40 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(0.05, -0.74) * sin(length(p) * 2.11 - time * 1.03) * 0.18;
	{ p = vec2(atan(p.y, p.x) * 1.21, length(p) * 3.86 - time * 0.39); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.49; p = rot2(0.90) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.46, lr * 1.23 + time * 0.60); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.91);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.17 + time * 0.13, vec3(0.45, 0.53, 0.46), vec3(0.36, 0.34, 0.48), vec3(0.79, 0.83, 1.07), vec3(0.87, 0.58, 0.86));
	col = clamp((col - 0.5) * 1.85 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
