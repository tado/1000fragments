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
    float petal = 0.69 + 0.26 * cos(sa * 4 + t * 2.60 + ph);
    v = sin((sr - petal) * 16.49);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.20 + t * 3.98 + ph) + sin(p.y * 9.93 - t * 3.98 + ph)
        + sin((p.x + p.y) * 11.59 + t * 3.98 + ph) + sin(length(p) * 9.08 - t * 3.98 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.86;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.43, lr * 1.74 + time * 0.78); }
	p += vec2(-0.26, 0.81) * sin(length(p) * 2.25 - time * 1.81) * 0.27;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.20; p = rot2(1.52) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.55);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.74 + time * 0.14, vec3(0.54, 0.42, 0.59), vec3(0.49, 0.40, 0.47), vec3(0.85, 0.80, 1.04), vec3(0.78, 0.62, 0.59));
	col = clamp((col - 0.5) * 1.86 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
