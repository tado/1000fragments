uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.17 + vec2(t * 0.79, -t * 0.54) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 2.81 * p.y + time * 2.03); p.y += 0.36 / wf * cos(wf * 3.45 * p.x + time * 1.38); }
	p = fract(p * 1.66) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.29), field(p, time, 2.59));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
