uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.72) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 3.26 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.73;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 2.86 * p.y + time * 1.13); p.y += 0.34 / wf * cos(wf * 3.18 * p.x + time * 1.00); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.70, lr * 1.38 + time * -0.54); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.34, 0.92, 1.40) + vec3(0.02, 0.01, 0.08);
	col = fract(col * 2.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
