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
    float petal = 0.66 + 0.15 * cos(sa * 8 + t * 1.09 + ph);
    v = sin((sr - petal) * 7.19);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.55;
	p = rot2(length(p) * 1.95 + time * 0.92) * p;
	p *= 1.86;
	{ float fr = length(p); p *= 1.0 + 0.44 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.49 + time * 0.16, vec3(0.59, 0.43, 0.49), vec3(0.39, 0.35, 0.47), vec3(1.37, 1.28, 1.22), vec3(0.51, 0.20, 0.67));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
