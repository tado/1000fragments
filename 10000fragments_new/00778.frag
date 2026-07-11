uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.13 + sin(p.y * 4.58 + t * 5.28) * 3.60 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.11, lr * 2.38 + time * 0.86); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 2.64 * p.y + time * 1.65); p.y += 0.36 / wf * cos(wf * 3.95 * p.x + time * 1.35); }
	p.y += sin(p.x * 2.99 + time * 3.88) * 0.22;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.71, 0.32, 0.56) * (0.22 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = mod(col * 2.95, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
