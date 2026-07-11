uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.48 + t * 3.34 + ph) + sin(p.y * 10.99 - t * 3.34 + ph)
        + sin((p.x + p.y) * 6.90 + t * 3.34 + ph) + sin(length(p) * 12.29 - t * 3.34 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 3.08 * p.y + time * 0.93); p.y += 0.29 / wf * cos(wf * 3.43 * p.x + time * 1.15); }
	p += vec2(0.80, 0.53) * sin(length(p) * 5.54 - time * 1.87) * 0.39;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.77), field(p, time, 1.55));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
