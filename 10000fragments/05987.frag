uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.93 + t * 1.45) - 0.5) * 2.0;
    v = sin((p.y * 5.93 + zx * 1.46 + t * 2.84) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.60 + 0.23 * pow(abs(cos(ra * 5.0 + t * 3.00)), 2.47);
    v = sin((rr - pet) * 15.01 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.77, length(q1) * 4.80 - time * 0.65); }
	{ q2 = vec2(atan(q2.y, q2.x) * 1.89, length(q2) * 5.10 - time * 0.22); }
	{ float fr = length(q2); q2 *= 1.0 + 0.60 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.56);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.13 + time * 0.24, vec3(0.42, 0.45, 0.40), vec3(0.40, 0.41, 0.47), vec3(1.35, 1.01, 0.81), vec3(0.07, 0.30, 0.20));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.39));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
