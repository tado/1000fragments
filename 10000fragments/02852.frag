uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.63 + vec2(t * 1.01, -t * 1.01) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.73;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 3.22 * p.y + time * 1.54); p.y += 0.44 / wf * cos(wf * 2.78 * p.x + time * 0.84); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.74 + time * 0.25, vec3(0.48, 0.54, 0.44), vec3(0.43, 0.39, 0.47), vec3(0.98, 1.22, 1.15), vec3(0.99, 0.11, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
