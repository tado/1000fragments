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
    float petal = 0.70 + 0.20 * cos(sa * 6 + t * 0.67 + ph);
    v = sin((sr - petal) * 8.48);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(1.19) * p;
	{ float fr = length(p); p *= 1.0 + -0.29 * fr * fr; }
	p = rot2(length(p) * -2.31 + time * 0.51) * p;
	p *= 1.38;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.89 + time * 0.06, vec3(0.55, 0.50, 0.48), vec3(0.45, 0.38, 0.50), vec3(1.34, 1.25, 0.83), vec3(0.08, 0.96, 0.93));
	col = mod(col * 1.27, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
