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
    float petal = 0.39 + 0.28 * cos(sa * 9.0 + t * 2.73 + ph);
    v = sin((sr - petal) * 11.32);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.65 + 0.24 * cos(sa * 3.0 + t * 0.84 + ph);
    v = sin((sr - petal) * 7.59);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q2 = fract(q2 * 1.27) - 0.5;
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.57; q2 = rot2(1.13) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.72);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.58 + time * 0.05, vec3(0.60, 0.52, 0.52), vec3(0.45, 0.40, 0.46), vec3(0.85, 1.12, 0.79), vec3(0.69, 0.09, 0.38));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
