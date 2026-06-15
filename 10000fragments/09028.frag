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
    float petal = 0.66 + 0.10 * cos(sa * 4 + t * 0.77 + ph);
    v = sin((sr - petal) * 14.93);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.12, lr * 2.45 + time * 0.13); }
	p += vec2(0.08, 0.98) * sin(length(p) * 4.62 - time * 1.88) * 0.37;
	p = rot2(time * 0.39) * p;
	p = rot2(0.60) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.96 + time * 0.15, vec3(0.57, 0.55, 0.58), vec3(0.33, 0.45, 0.43), vec3(0.90, 0.95, 1.17), vec3(0.34, 0.92, 0.98));
	col = mod(col * 1.87, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
