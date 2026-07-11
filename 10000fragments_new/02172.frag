uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.34 + 0.13 * cos(sa * 9.0 + t * 0.74 + ph);
    v = sin((sr - petal) * 19.52);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.68) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 0.77 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.23, 0.0)) * 13.42 - t * 3.98 + ph);
    float mb = sin(length(p + vec2(0.23, 0.0)) * 27.19 - t * 2.33 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.17;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q2 = rot2(2.07) * q2;
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.24);
	float d3 = fieldC(q3, time, 0.84);
	d2 = d2 * d3;
	float d = max(d1, d2);
	vec3 col = vec3(0.53, 0.40, 0.92) * (0.20 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= 0.86 + 0.15 * sin(gl_FragCoord.y * 2.89 + time * 11.52);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
