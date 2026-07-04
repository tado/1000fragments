uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.54 + 0.10 * cos(sa * 8.0 + t * 2.84 + ph);
    v = sin((sr - petal) * 18.42);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 12.62 - t * 1.80 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.36 + sin(p.y * 2.82 + t * 2.56) * 3.36 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(0.79) * q1;
	q2 = abs(q2);
	q2 *= 1.0 + 0.19 * sin(time * 4.80);
	{ float fr = length(q3); q3 *= 1.0 + 0.74 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.48);
	float d3 = fieldC(q3, time, 0.45);
	d2 = 0.5 * (d2 + d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.88));
	vec3 col = palette(d * 0.82 + time * 0.15, vec3(0.56, 0.54, 0.42), vec3(0.34, 0.36, 0.38), vec3(0.96, 0.93, 0.94), vec3(0.28, 0.55, 0.83));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
