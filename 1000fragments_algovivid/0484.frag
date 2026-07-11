uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.31 + 0.28 * pow(abs(cos(ra * 2.0 + t * 1.35)), 0.85);
    v = sin((rr - pet) * 8.45 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.19;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.57; kp = rot2(2.12) * kp; kp *= 1.20; }
    v = sin(kp.y * 3.75 - t * 1.55 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.35;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 0.61;
	q2 = rot2(1.71) * q2;
	float d1 = fieldA(q1, (time * 0.59), 0.0);
	float d2 = fieldB(q2, (time * 0.59), 1.22);
	float d = abs(d1 - d2);
	vec3 col = palette((d) * 0.93 + (time * 0.59) * 0.12, vec3(0.34, 0.32, 0.31), vec3(0.23, 0.20, 0.16), vec3(0.50, 0.72, 0.90), vec3(0.24, 0.84, 0.97));
	col *= 0.87 + 0.20 * sin(gl_FragCoord.y * 2.84 + (time * 0.59) * 17.72);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.36);
	col = clamp(col, 0.0, 1.0) * vec3(1.016, 1.012, 0.995) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
