uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.43 + sin(p.y * 4.55 + t * 3.19) * 1.81 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.33 + vec2(t * 0.92, -t * 0.92) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.61;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 1.78 * p.y + time * 1.76); p.y += 0.25 / wf * cos(wf * 2.92 * p.x + time * 1.92); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.06);
	float d = d1 * d2;
	vec3 col = palette(d * 1.53 + time * 0.04, vec3(0.47, 0.47, 0.56), vec3(0.33, 0.45, 0.40), vec3(1.17, 1.13, 0.98), vec3(0.62, 0.17, 0.74));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
