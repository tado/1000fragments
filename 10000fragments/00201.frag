uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.83 + t * 5.36 + ph) + sin(p.y * 11.59 - t * 0.53 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + 0.49 * fr * fr; }
	p += vec2(-0.75, -0.62) * sin(length(p) * 5.67 - time * 1.81) * 0.17;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 2.15 * p.y + time * 1.30); p.y += 0.41 / wf * cos(wf * 3.81 * p.x + time * 1.16); }
	p *= 2.02;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.33), field(p, time, 2.66));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
