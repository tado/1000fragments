uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.74 + t * 4.94 + ph) + sin(p.y * 13.97 - t * 4.94 + ph)
        + sin((p.x + p.y) * 3.17 + t * 4.94 + ph) + sin(length(p) * 15.56 - t * 4.94 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 2.55 * p.y + time * 1.83); p.y += 0.49 / wf * cos(wf * 2.32 * p.x + time * 1.51); }
	{ float fr = length(p); p *= 1.0 + 0.42 * fr * fr; }
	p = abs(p) - 0.42;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.17), field(p, time, 2.35));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.60 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
