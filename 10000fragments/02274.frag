uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.34 + 0.17 * cos(sa * 3 + t * 0.47 + ph);
    v = sin((sr - petal) * 7.91);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.82;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 1.94 * p.y + time * 0.70); p.y += 0.47 / wf * cos(wf * 2.46 * p.x + time * 1.65); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.07, lr * 1.30 + time * -0.80); }
	p = abs(p);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.15, 0.42, 0.31), vec3(0.58, 0.70, 0.88), d);
	col = clamp((col - 0.5) * 1.85 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
