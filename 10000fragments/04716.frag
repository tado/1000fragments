uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.46, 0.0)) * 31.11 - t * 5.15 + ph);
    float mb = sin(length(p + vec2(0.46, 0.0)) * 25.90 - t * 5.15 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.91;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 2.73 * p.y + time * 1.03); p.y += 0.37 / wf * cos(wf * 2.15 * p.x + time * 0.65); }
	p *= 1.98;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.20), field(p, time, 2.41));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
