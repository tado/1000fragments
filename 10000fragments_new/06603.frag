uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.39;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.65; kp = rot2(0.77) * kp; kp *= 1.30; }
    v = sin(kp.y * 1.90 - t * 3.01 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 32.85 - t * 8.33 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q1.x += 0.32 / wf * sin(wf * 3.09 * q1.y + time * 1.68); q1.y += 0.50 / wf * cos(wf * 2.08 * q1.x + time * 1.08); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.42);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.43 + time * 0.85);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
