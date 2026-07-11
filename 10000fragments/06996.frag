uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.57, t * 1.16 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.00;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 2.37 * p.y + time * 0.77); p.y += 0.28 / wf * cos(wf * 1.81 * p.x + time * 0.62); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.70, lr * 2.81 + time * 0.63); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.55; p = rot2(1.60) * p; }
	p = rot2(p.y * -2.34 + time * 0.55) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.57), field(p, time, 1.13));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
