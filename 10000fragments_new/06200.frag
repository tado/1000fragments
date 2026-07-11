uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 10.0 + qr * 4.44 * sin(t * 1.13) + t * 1.76 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.46;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.43, lr * 1.75 + time * 0.43); }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 1.72 * p.y + time * 2.07); p.y += 0.22 / wf * cos(wf * 3.96 * p.x + time * 1.38); }
	p += vec2(0.91, 0.18) * sin(length(p) * 4.42 - time * 2.39) * 0.13;
	{ float fr = length(p); p *= 1.0 + 0.39 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.97), field(p, time, 1.94));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
