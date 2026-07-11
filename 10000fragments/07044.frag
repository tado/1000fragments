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
    float petal = 0.31 + 0.29 * cos(sa * 8 + t * 1.60 + ph);
    v = sin((sr - petal) * 7.01);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.55, t * 0.91 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(1.99) * p;
	{ float fr = length(p); p *= 1.0 + 0.67 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.66);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.70 + time * 0.07, vec3(0.43, 0.41, 0.43), vec3(0.44, 0.36, 0.35), vec3(0.86, 0.70, 1.29), vec3(0.41, 0.05, 0.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
