uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 12.77 + t * 1.34 + ph) * 0.7;
    float wb = sin(p.y * 8.73 - t * 0.98 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.45;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.77;
	p = abs(p) - 0.34;
	p = fract(p * 1.52) - 0.5;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 2.17 * p.y + time * 1.65); p.y += 0.44 / wf * cos(wf * 2.56 * p.x + time * 1.29); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.88, lr * 2.03 + time * -0.26); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.37, 0.07, 0.29), vec3(0.88, 0.60, 0.74), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.39));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
