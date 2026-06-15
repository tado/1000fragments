uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 34.57 - t * 5.52 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.35;
	{ float fr = length(p); p *= 1.0 + 0.35 * fr * fr; }
	p += vec2(-0.35, -0.78) * sin(length(p) * 5.01 - time * 0.56) * 0.19;
	p = abs(p) - 0.72;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 1.72 * p.y + time * 1.16); p.y += 0.23 / wf * cos(wf * 1.50 * p.x + time * 1.59); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.47, 1.47, 1.27) + vec3(0.24, 0.11, 0.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
