uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 3.0 + qr * 7.17 * sin(t * 1.04) + t * 1.41 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.29 + sr * 8.88 - t * 1.79 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.84;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 2.84;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.61, length(q1) * 4.37 - time * 0.44); }
	q2 = rot2(2.50) * q2;
	{ float fr = length(q2); q2 *= 1.0 + 0.56 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.61);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.73));
	vec3 col = palette(d * 0.79 + time * 0.11, vec3(0.42, 0.58, 0.57), vec3(0.39, 0.49, 0.36), vec3(1.02, 1.16, 0.99), vec3(0.51, 0.45, 0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
