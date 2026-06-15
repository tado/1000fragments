uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.29, 0.0)) * 29.16 - t * 2.75 + ph);
    float mb = sin(length(p + vec2(0.29, 0.0)) * 31.93 - t * 2.75 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.86;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 2.85 * p.y + time * 1.58); p.y += 0.29 / wf * cos(wf * 1.62 * p.x + time * 0.76); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.89), field(p, time, 1.79));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.88, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
