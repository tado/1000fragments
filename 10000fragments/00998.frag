uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.75 + t * 0.68 + ph) + sin(p.y * 13.21 - t * 0.68 + ph)
        + sin((p.x + p.y) * 3.27 + t * 0.68 + ph) + sin(length(p) * 17.47 - t * 0.68 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.93;
	{ float fr = length(p); p *= 1.0 + -0.67 * fr * fr; }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.33 / wf * sin(wf * 2.76 * p.y + time * 1.54); p.y += 0.34 / wf * cos(wf * 1.54 * p.x + time * 1.02); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.94), field(p, time, 1.89));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
