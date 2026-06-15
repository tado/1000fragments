uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.60 + t * 2.39 + ph) + sin(p.y * 12.74 - t * 2.39 + ph)
        + sin((p.x + p.y) * 6.99 + t * 2.39 + ph) + sin(length(p) * 16.69 - t * 2.39 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.33;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 3.05 * p.y + time * 0.99); p.y += 0.45 / wf * cos(wf * 3.47 * p.x + time * 1.26); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.28), field(p, time, 0.55));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.73 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
