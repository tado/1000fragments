uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 10.0 + qr * 5.62 * sin(t * 1.44) + t * 5.09 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 2.65 * p.y + time * 1.53); p.y += 0.46 / wf * cos(wf * 1.91 * p.x + time * 0.67); }
	{ float fr = length(p); p *= 1.0 + 0.74 * fr * fr; }
	p.x += sin(p.y * 3.82 + time * 3.56) * 0.17;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.25, lr * 1.80 + time * 0.77); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.19, 0.38, 0.37), vec3(0.74, 0.97, 0.60), d);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.87 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
