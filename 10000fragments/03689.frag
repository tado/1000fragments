uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.68) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 2.06 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.07;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.45, lr * 2.83 + time * -0.30); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 3.98 * p.y + time * 0.97); p.y += 0.46 / wf * cos(wf * 3.29 * p.x + time * 1.78); }
	p += vec2(-0.60, -0.82) * sin(length(p) * 2.18 - time * 1.71) * 0.38;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.01), field(p, time, 2.01));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
