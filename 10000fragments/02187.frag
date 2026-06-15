uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.85 * sin(mf + 3.0) + ph), cos(t * 1.85 * cos(mf + 3.0) + ph));
        ms += 0.042 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.77;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 1.68 * p.y + time * 0.66); p.y += 0.49 / wf * cos(wf * 2.50 * p.x + time * 1.94); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.66 + time * 0.07, vec3(0.52, 0.42, 0.48), vec3(0.49, 0.47, 0.34), vec3(0.82, 0.84, 1.10), vec3(0.85, 0.80, 0.27));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
