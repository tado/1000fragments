uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.44 * sin(mf + 3.0) + ph), cos(t * 0.44 * cos(mf + 3.0) + ph));
        ms += 0.037 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.84 + vec2(t * 2.22, -t * 2.22) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.09;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 3.40 * p.y + time * 0.68); p.y += 0.25 / wf * cos(wf * 3.69 * p.x + time * 1.93); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.43);
	float d = d1 + d2;
	vec3 col = palette(d * 1.62 + time * 0.04, vec3(0.43, 0.47, 0.45), vec3(0.45, 0.49, 0.47), vec3(1.18, 1.09, 0.73), vec3(0.53, 0.84, 0.40));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
