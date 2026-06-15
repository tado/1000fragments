uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.12 + vec2(t * 0.76, -t * 0.76) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.86;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.29; p = rot2(2.34) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.03, lr * 2.80 + time * 0.41); }
	p = rot2(length(p) * 3.81 + time * 0.37) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 2.73 * p.y + time * 1.68); p.y += 0.45 / wf * cos(wf * 1.99 * p.x + time * 0.93); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.73), field(p, time, 1.45));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.76 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
