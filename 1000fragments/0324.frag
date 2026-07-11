uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.07 + vec2(t * 2.95, -t * 2.95) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 3.18 * p.y + time * 1.10); p.y += 0.34 / wf * cos(wf * 2.82 * p.x + time * 0.83); }
	p += vec2(0.48, -0.03) * sin(length(p) * 2.52 - time * 1.07) * 0.15;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.64 + time * 0.22, vec3(0.58, 0.47, 0.48), vec3(0.42, 0.47, 0.39), vec3(1.00, 1.38, 1.18), vec3(0.02, 0.84, 0.13));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
