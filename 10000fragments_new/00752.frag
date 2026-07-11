uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.60;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.62; kp = rot2(1.64) * kp; kp *= 1.18; }
    v = sin(kp.x * 1.42 - t * 3.90 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.41 + 0.17 * pow(abs(cos(ra * 6.0 + t * 0.66)), 1.91);
    v = sin((rr - pet) * 21.58 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * 2.06 + time * 0.51) * q1;
	for(int fo = 0; fo < 4; fo++){ q1 = abs(q1) - 0.34; q1 = rot2(2.11) * q1; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.53);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.58));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.74 + time * 0.43);
	col = clamp((col - 0.5) * 1.62 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
