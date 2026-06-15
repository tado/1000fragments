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
    float petal = 0.36 + 0.20 * cos(sa * 4 + t * 2.93 + ph);
    v = sin((sr - petal) * 14.47);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.36 + 0.21 * cos(sa * 4 + t * 2.72 + ph);
    v = sin((sr - petal) * 7.98);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 1.39) - 0.5;
	p = rot2(1.33) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.72);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.86 + time * 0.23, vec3(0.48, 0.53, 0.46), vec3(0.44, 0.39, 0.48), vec3(1.22, 0.94, 0.90), vec3(0.64, 0.09, 0.80));
	col = fract(col * 1.39);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
