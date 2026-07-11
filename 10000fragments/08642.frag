uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.65 + sin(p.y * 3.83 + t * 1.12) * 3.86 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.99 * sin(mf + 3.0) + ph), cos(t * 0.99 * cos(mf + 3.0) + ph));
        ms += 0.032 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 3.62 * p.y + time * 1.05); p.y += 0.25 / wf * cos(wf * 2.85 * p.x + time * 1.96); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.56);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.19 + time * 0.11, vec3(0.47, 0.50, 0.52), vec3(0.48, 0.42, 0.43), vec3(1.02, 0.75, 1.35), vec3(0.88, 0.39, 0.37));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
