uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.47, 0.0)) * 22.63 - t * 1.76 + ph);
    float mb = sin(length(p + vec2(0.47, 0.0)) * 37.84 - t * 2.30 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.32;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 2.87 * p.y + time * 1.50); p.y += 0.48 / wf * cos(wf * 3.03 * p.x + time * 0.93); }
	{ p = vec2(atan(p.y, p.x) * 2.92, length(p) * 3.09 - time * 0.88); }
	p *= 3.08;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.41), field(p, time, 0.82));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
