uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.59 + t * 3.64 + ph) + sin(p.y * 11.68 - t * 3.64 + ph)
        + sin((p.x + p.y) * 3.26 + t * 3.64 + ph) + sin(length(p) * 17.60 - t * 3.64 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.16;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.58; kp = rot2(2.03) * kp; kp *= 1.43; }
    v = sin(kp.y * 2.63 - t * 3.01 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.47);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.11, 0.15, 0.17), vec3(0.72, 0.78, 0.59), cc);
	col = clamp((col - 0.5) * 2.19 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
