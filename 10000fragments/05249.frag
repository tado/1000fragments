uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.89 + vec2(t * 1.43, -t * 1.43) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 2.46 * p.y + time * 0.97); p.y += 0.48 / wf * cos(wf * 2.21 * p.x + time * 1.77); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.48), field(p, time, 0.96));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
