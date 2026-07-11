uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.29, 0.0)) * 17.35 - t * 3.78 + ph);
    float mb = sin(length(p + vec2(0.29, 0.0)) * 31.18 - t * 3.78 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.88;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 2.27 * p.y + time * 0.76); p.y += 0.40 / wf * cos(wf * 2.25 * p.x + time * 1.17); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.09), field(p, time, 2.18));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
