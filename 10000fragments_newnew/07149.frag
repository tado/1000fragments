uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.12 + sin(p.y * 2.38 + t * 4.28) * 4.32 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.61;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.59; kp = rot2(2.71) * kp; kp *= 1.18; }
    v = sin(kp.x * 3.04 - t * 4.15 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * -3.39 + time * 0.65) * q1;
	q1 = rot2(q1.y * 1.29 + time * 0.46) * q1;
	q2 = rot2(length(q2) * 2.82 + time * 1.11) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.90);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.79));
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.16, 0.88, 0.54) + vec3(0.05, 0.21, 0.07);
	col = mod(col * 2.28, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
