uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.99 + vec2(t * 2.14, -t * 1.66) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.47, 0.0)) * 38.29 - t * 6.40 + ph);
    float mb = sin(length(p + vec2(0.47, 0.0)) * 26.09 - t * 4.63 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(1.61) * q1;
	{ float fr = length(q2); q2 *= 1.0 + 0.29 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.75);
	float d = d1 * d2;
	vec3 col = palette(d * 1.16 + time * 0.08, vec3(0.45, 0.43, 0.49), vec3(0.39, 0.44, 0.39), vec3(1.26, 1.04, 0.75), vec3(0.07, 0.30, 0.94));
	col = mod(col * 1.33, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
