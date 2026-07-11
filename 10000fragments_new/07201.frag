uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.39, 0.0)) * 9.49 - t * 3.41 + ph);
    float mb = sin(length(p + vec2(0.39, 0.0)) * 38.72 - t * 7.44 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.38;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.80, lr * 1.14 + time * -0.84); }
	p += vec2(-0.25, -0.51) * sin(length(p) * 5.96 - time * 1.92) * 0.35;
	p = fract(p * 2.31) - 0.5;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 2.62 * p.y + time * 1.81); p.y += 0.50 / wf * cos(wf * 1.60 * p.x + time * 1.82); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.35, 0.25, 0.17) * (0.08 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
