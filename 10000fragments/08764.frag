uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.44 * sin(mf + 3.0) + ph), cos(t * 0.44 * cos(mf + 3.0) + ph));
        ms += 0.096 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.63;
	p *= 3.26;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 3.59 * p.y + time * 1.40); p.y += 0.21 / wf * cos(wf * 3.71 * p.x + time * 0.99); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.10, lr * 1.33 + time * 0.48); }
	p = rot2(2.78) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.36), field(p, time, 2.72));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
