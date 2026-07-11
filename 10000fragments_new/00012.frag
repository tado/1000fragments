uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.20 + t * 2.70 + ph) + sin(p.y * 7.95 - t * 2.70 + ph)
        + sin((p.x + p.y) * 4.16 + t * 2.70 + ph) + sin(length(p) * 7.69 - t * 2.70 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.65 * sin(mf + 3.0) + ph), cos(t * 1.05 * cos(mf + 3.0) + ph));
        ms += 0.086 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.75;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.35 / wf * sin(wf * 2.66 * q1.y + time * 1.79); q1.y += 0.32 / wf * cos(wf * 2.92 * q1.x + time * 2.18); }
	{ q1 = vec2(atan(q1.y, q1.x) * 1.57, length(q1) * 3.46 - time * 0.94); }
	{ float fr = length(q2); q2 *= 1.0 + 0.70 * fr * fr; }
	q2 = rot2(0.89) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.49);
	float d = d1 * d2;
	vec3 col = palette(d * 1.28 + time * 0.22, vec3(0.51, 0.52, 0.55), vec3(0.47, 0.38, 0.46), vec3(1.11, 1.02, 1.09), vec3(0.62, 0.16, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
