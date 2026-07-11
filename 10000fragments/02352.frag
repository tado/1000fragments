uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.32 + sin(p.y * 2.79 + t * 1.25) * 1.38 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.40 + 0.23 * cos(sa * 8 + t * 1.27 + ph);
    v = sin((sr - petal) * 15.86);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.17;
	p = rot2(time * 0.34) * p;
	{ float fr = length(p); p *= 1.0 + -0.30 * fr * fr; }
	p = rot2(0.94) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.98);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.54 + time * 0.22, vec3(0.41, 0.52, 0.45), vec3(0.37, 0.43, 0.38), vec3(1.06, 1.11, 1.29), vec3(0.40, 0.20, 0.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
