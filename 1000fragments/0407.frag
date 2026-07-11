uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.93 + sin(p.y * 1.06 + t * 0.65) * 2.91 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 3.86 * p.y + time * 1.90); p.y += 0.23 / wf * cos(wf * 3.23 * p.x + time * 1.80); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.68), field(p, time, 1.37));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
