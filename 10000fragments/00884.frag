uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.48 + sin(p.y * 4.35 + t * 2.92) * 1.22 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.90;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 1.95 * p.y + time * 1.29); p.y += 0.43 / wf * cos(wf * 3.80 * p.x + time * 1.99); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.39), field(p, time, 2.78));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
