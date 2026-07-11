uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 2.99;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 12.50 - t * 3.10 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.01;
	p = (floor(p * 9.2) + 0.5) / 9.2;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.10, lr * 1.10 + time * -0.96); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 1.57 * p.y + time * 2.17); p.y += 0.27 / wf * cos(wf * 1.56 * p.x + time * 2.13); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.20, 0.49, 0.57), vec3(0.87, 0.75, 0.80), d);
	col = mod(col * 2.67, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
