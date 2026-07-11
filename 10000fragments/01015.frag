uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.21 + t * 0.96 + ph) + sin(p.y * 7.90 - t * 0.96 + ph)
        + sin((p.x + p.y) * 2.24 + t * 0.96 + ph) + sin(length(p) * 10.46 - t * 0.96 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 3.22 * p.y + time * 1.76); p.y += 0.28 / wf * cos(wf * 3.84 * p.x + time * 1.52); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.22), field(p, time, 0.44));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
