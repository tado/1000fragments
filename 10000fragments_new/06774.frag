uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.04 + t * 1.14 + ph) + sin(p.y * 4.25 - t * 1.14 + ph)
        + sin((p.x + p.y) * 10.35 + t * 1.14 + ph) + sin(length(p) * 17.50 - t * 1.14 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.51;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.74; kp = rot2(1.74) * kp; kp *= 1.44; }
    v = sin(kp.y * 3.32 - t * 3.34 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(-0.57, -0.73) * sin(length(q1) * 2.10 - time * 2.21) * 0.12;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.78, length(q1) * 2.09 - time * 0.65); }
	{ q2 = vec2(atan(q2.y, q2.x) * 1.59, length(q2) * 2.17 - time * 0.81); }
	q2 = (floor(q2 * 7.8) + 0.5) / 7.8;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.53);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.00, 0.25, 0.50), vec3(1.00, 0.73, 0.70), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
