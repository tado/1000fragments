uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.40) - 0.5;
    float rad = 0.45 + 0.12 * sin(t * 3.84 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 1.69, length(p) * 2.66 - time * 0.36); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 1.70 * p.y + time * 0.80); p.y += 0.41 / wf * cos(wf * 3.86 * p.x + time * 1.72); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.79, lr * 2.64 + time * 0.33); }
	p += vec2(0.77, -0.21) * sin(length(p) * 4.64 - time * 1.00) * 0.25;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.79 + time * 0.14);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
