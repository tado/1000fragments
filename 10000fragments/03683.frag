uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.20) - 0.5;
    float rad = 0.39 + 0.12 * sin(t * 0.65 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.87;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 2.07 * p.y + time * 0.63); p.y += 0.26 / wf * cos(wf * 1.66 * p.x + time * 1.51); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.09), field(p, time, 2.18));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.46));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
