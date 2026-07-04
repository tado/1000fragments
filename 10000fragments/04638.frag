uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.42 + 0.16 * cos(sa * 4.0 + t * 1.42 + ph);
    v = sin((sr - petal) * 15.71);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.35 + 0.13 * cos(sa * 3.0 + t * 1.32 + ph);
    v = sin((sr - petal) * 19.77);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.08 + t * 0.40) - 0.5) * 2.0;
    v = sin((p.y * 7.90 + zx * 1.17 + t * 1.99) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q3 = vec2(atan(q3.y, q3.x) * 1.36, length(q3) * 4.13 - time * 0.71); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.93);
	float d3 = fieldC(q3, time, 1.76);
	d2 = abs(d2 - d3);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.32 + time * 0.31, vec3(0.43, 0.48, 0.53), vec3(0.42, 0.32, 0.44), vec3(0.91, 0.72, 0.99), vec3(0.68, 0.84, 0.98));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.33));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
