uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.32 + vec2(t * 0.45, -t * 0.52) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.41, 0.0)) * 31.01 - t * 6.09 + ph);
    float mb = sin(length(p + vec2(0.41, 0.0)) * 16.80 - t * 6.42 + ph);
    v = ma * mb;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.90) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 3.56 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.69;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(time * 1.13) * q1;
	q2 = (floor(q2 * 10.8) + 0.5) / 10.8;
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.64);
	float d3 = fieldC(q3, time, 0.53);
	d2 = min(d2, d3);
	float d = d1 * d2;
	vec3 col = palette(d * 0.73 + time * 0.02, vec3(0.52, 0.60, 0.44), vec3(0.39, 0.43, 0.38), vec3(0.88, 1.30, 0.81), vec3(0.44, 0.96, 0.40));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
