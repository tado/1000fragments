uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.43;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.55; kp = rot2(0.56) * kp; kp *= 1.24; }
    v = sin(kp.y * 1.32 - t * 4.29 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.33 + sin(p.y * 3.58 + t * 1.02) * 2.57 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.35, 0.0)) * 28.17 - t * 5.19 + ph);
    float mb = sin(length(p + vec2(0.35, 0.0)) * 31.05 - t * 3.12 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int fo = 0; fo < 5; fo++){ q1 = abs(q1) - 0.55; q1 = rot2(0.85) * q1; }
	q2 = rot2(time * -0.98) * q2;
	q2 = rot2(2.27) * q2;
	q3 = abs(q3) - 0.41;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.02);
	float d3 = fieldC(q3, time, 0.05);
	d2 = 0.5 * (d2 + d3);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.31 + time * 0.66);
	col = clamp((col - 0.5) * 1.72 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
