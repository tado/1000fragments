uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.31 + 0.25 * pow(abs(cos(ra * 6.0 + t * 2.47)), 2.28);
    v = sin((rr - pet) * 14.41 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 7.02;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.21 + 0.09 * sin(t * 4.92 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.56;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.81, lr * 2.72 + (time * 0.81) * -0.63); }
	q1 = rot2(2.53) * q1;
	q2 = sin(q2 * 1.89 + (time * 0.81) * 2.13) * 0.61;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.43, length(q2) * 3.23 - (time * 0.81) * 0.31); }
	float d1 = fieldA(q1, (time * 0.81), 0.0);
	float d2 = fieldB(q2, (time * 0.81), 0.39);
	float d = d1 * d2;
	vec3 col = palette((d) * 0.68 + (time * 0.81) * 0.11, vec3(0.30, 0.37, 0.38), vec3(0.27, 0.26, 0.31), vec3(0.44, 0.81, 0.43), vec3(0.88, 0.41, 0.49));
	col *= 0.86 + 0.13 * sin(gl_FragCoord.y * 1.37 + (time * 0.81) * 17.60);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(0.991, 0.996, 1.017) * 1.00 + 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
