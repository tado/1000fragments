uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 10.98 - t * 8.30 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + 0.36 * fr * fr; }
	p *= 1.21;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 3.37 * p.y + time * 0.94); p.y += 0.21 / wf * cos(wf * 3.40 * p.x + time * 1.42); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.21), field(p, time, 2.42));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.59 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
