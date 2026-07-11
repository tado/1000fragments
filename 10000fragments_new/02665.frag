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
    v = sin(sa * 5.13 + sr * 21.97 - t * 2.15 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 19.77 - t * 2.27 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 2; fo++){ q1 = abs(q1) - 0.58; q1 = rot2(2.41) * q1; }
	q1 = rot2(1.96) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.51);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.57 + time * 0.20, vec3(0.42, 0.58, 0.45), vec3(0.35, 0.43, 0.30), vec3(0.85, 1.09, 0.98), vec3(0.13, 0.34, 0.48));
	col = fract(col * 2.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
