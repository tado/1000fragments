uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.33 + t * 4.97 + ph) + sin(p.y * 11.83 - t * 4.97 + ph)
        + sin((p.x + p.y) * 6.43 + t * 4.97 + ph) + sin(length(p) * 7.33 - t * 4.97 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 3.32 * p.y + time * 1.45); p.y += 0.44 / wf * cos(wf * 2.41 * p.x + time * 1.67); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.92, lr * 2.58 + time * 0.77); }
	p = rot2(1.27) * p;
	p *= 3.26;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.03), field(p, time, 2.06));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.98 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
