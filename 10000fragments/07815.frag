uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.30 + 0.15 * cos(sa * 6 + t * 1.38 + ph);
    v = sin((sr - petal) * 19.55);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.03;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 2.79 * p.y + time * 0.82); p.y += 0.37 / wf * cos(wf * 3.45 * p.x + time * 0.69); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.37, lr * 2.17 + time * -0.71); }
	p *= 2.09;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.76), field(p, time, 1.53));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.47);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
