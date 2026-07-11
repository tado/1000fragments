uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.53 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.23 + t * 1.35 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.78;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 3.59 * p.y + time * 1.76); p.y += 0.21 / wf * cos(wf * 3.06 * p.x + time * 2.16); }
	p = (floor(p * 29.9) + 0.5) / 29.9;
	p = fract(p * 2.64) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.67), field(p, time, 1.34));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
