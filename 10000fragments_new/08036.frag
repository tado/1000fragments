uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 7.99 + t * 1.72 + ph) * 0.7;
    float wb = sin(p.y * 9.78 - t * 0.72 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.59;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.79;
	p = rot2(length(p) * 2.39 + time * 0.32) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 3.02 * p.y + time * 1.01); p.y += 0.24 / wf * cos(wf * 2.05 * p.x + time * 1.95); }
	p.y += sin(p.x * 5.75 + time * 3.51) * 0.37;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.75, lr * 2.19 + time * 0.71); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.34), field(p, time, 0.68));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
