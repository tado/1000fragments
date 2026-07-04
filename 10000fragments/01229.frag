uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.52 + t * 0.97) - 0.5) * 2.0;
    v = sin((p.y * 5.47 + zx * 1.80 + t * 0.50) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.18;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.79; kp = rot2(1.16) * kp; kp *= 1.43; }
    v = sin(kp.x * 1.55 - t * 2.71 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.47;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.50 / wf * sin(wf * 2.06 * q2.y + time * 2.01); q2.y += 0.46 / wf * cos(wf * 3.51 * q2.x + time * 1.45); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.76);
	float d = d1 * d2;
	vec3 col = vec3(0.24, 0.59, 0.39) * (0.14 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= 0.82 + 0.15 * sin(gl_FragCoord.y * 1.08 + time * 9.45);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
