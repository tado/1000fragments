uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 1.86 + vec2(t * 0.70, -t * 0.72);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.26;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.69; kp = rot2(1.57) * kp; kp *= 1.19; }
    v = sin(kp.x * 2.98 - t * 2.57 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.59) * 0.83), cos((time * 0.59) * 0.94)) * 0.24;
	p.x *= resolution.x / resolution.y;
	p *= 1.88;
	vec2 q1 = p; vec2 q2 = p;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.67;
	float d1 = fieldA(q1, (time * 0.59), 0.0);
	float d2 = fieldB(q2, (time * 0.59), 0.17);
	float d = min(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.57, 0.44, 0.57) + vec3(0.03, 0.02, 0.05);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col = clamp(col, 0.0, 1.0) * vec3(0.928, 0.968, 1.044) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
