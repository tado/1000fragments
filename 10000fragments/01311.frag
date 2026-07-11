uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.66 + t * 1.98 + ph) + sin(p.y * 4.63 - t * 1.98 + ph)
        + sin((p.x + p.y) * 3.27 + t * 1.98 + ph) + sin(length(p) * 7.74 - t * 1.98 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.25;
	p *= 2.03;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 3.34 * p.y + time * 1.75); p.y += 0.27 / wf * cos(wf * 2.76 * p.x + time * 1.59); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.65), field(p, time, 1.30));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
