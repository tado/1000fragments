uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.91) - 0.5;
    float rad = 0.30 + 0.12 * sin(t * 1.80 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.24;
	{ p = vec2(atan(p.y, p.x) * 1.87, length(p) * 3.13 - time * 0.43); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 2.87 * p.y + time * 1.57); p.y += 0.42 / wf * cos(wf * 3.60 * p.x + time * 1.10); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.27, 0.06, 0.31), vec3(0.82, 0.82, 0.55), d);
	col = clamp((col - 0.5) * 1.99 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
