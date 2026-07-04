uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.76;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.50; kp = rot2(1.36) * kp; kp *= 1.35; }
    v = sin(kp.x * 3.42 - t * 2.09 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 18.49 + t * 3.22 + ph) * 0.7;
    float wb = sin(p.y * 17.27 - t * 1.35 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.58;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 1.93 * p.y + time * 0.82); p.y += 0.36 / wf * cos(wf * 2.93 * p.x + time * 1.70); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.60);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.73 + time * 0.24, vec3(0.58, 0.59, 0.53), vec3(0.39, 0.49, 0.37), vec3(1.08, 0.85, 1.34), vec3(0.93, 0.20, 0.39));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
