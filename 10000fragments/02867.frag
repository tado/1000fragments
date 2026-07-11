uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.22 + vec2(t * 2.18, -t * 2.18) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 3.67 * p.y + time * 1.45); p.y += 0.41 / wf * cos(wf * 2.50 * p.x + time * 1.66); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.61, lr * 1.80 + time * 0.70); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.30; p = rot2(2.40) * p; }
	p *= 2.50;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.22), field(p, time, 0.44));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
