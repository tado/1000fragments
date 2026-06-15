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
    float petal = 0.62 + 0.19 * cos(sa * 5 + t * 0.44 + ph);
    v = sin((sr - petal) * 8.86);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.44 + 0.15 * cos(sa * 3 + t * 2.15 + ph);
    v = sin((sr - petal) * 17.31);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.24;
	{ p = vec2(atan(p.y, p.x) * 2.26, length(p) * 2.55 - time * 0.11); }
	{ float fr = length(p); p *= 1.0 + -0.73 * fr * fr; }
	p = rot2(length(p) * -1.83 + time * 0.47) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.36);
	float d = d1 * d2;
	vec3 col = palette(d * 0.91 + time * 0.19, vec3(0.54, 0.43, 0.40), vec3(0.31, 0.50, 0.49), vec3(1.21, 1.09, 0.88), vec3(0.36, 0.08, 0.75));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
