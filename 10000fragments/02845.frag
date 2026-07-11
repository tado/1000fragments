uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.79 + vec2(t * 2.92, -t * 2.92) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.21, lr * 2.99 + time * 0.28); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.50 / wf * sin(wf * 3.31 * p.y + time * 1.96); p.y += 0.22 / wf * cos(wf * 2.35 * p.x + time * 1.44); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.08, 1.19, 1.23) + vec3(0.28, 0.20, 0.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
