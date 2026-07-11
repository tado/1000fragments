uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.56, 0.0)) * 33.83 - t * 3.90 + ph);
    float mb = sin(length(p + vec2(0.56, 0.0)) * 36.22 - t * 6.99 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.22, 0.0)) * 23.88 - t * 2.28 + ph);
    float mb = sin(length(p + vec2(0.22, 0.0)) * 31.40 - t * 6.65 + ph);
    v = ma * mb;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.87, t * 1.19 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q1); q1 *= 1.0 + 0.78 * fr * fr; }
	q1 = rot2(time * 1.39) * q1;
	{ float fr = length(q2); q2 *= 1.0 + 0.64 * fr * fr; }
	q2 = rot2(q2.y * 2.25 + time * 1.19) * q2;
	{ q3 = vec2(atan(q3.y, q3.x) * 1.06, length(q3) * 4.01 - time * 0.39); }
	q3 = rot2(length(q3) * -2.78 + time * 1.35) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.89);
	float d3 = fieldC(q3, time, 0.42);
	d2 = min(d2, d3);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.64 + time * 0.38, vec3(0.57, 0.52, 0.52), vec3(0.44, 0.35, 0.32), vec3(1.31, 1.26, 1.34), vec3(0.75, 0.22, 0.72));
	col = mod(col * 2.29, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
