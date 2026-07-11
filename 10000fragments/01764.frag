uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 21.20 - t * 3.73 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 2.51 * p.y + time * 1.31); p.y += 0.46 / wf * cos(wf * 1.58 * p.x + time * 1.84); }
	p = rot2(length(p) * 1.52 + time * 0.82) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.42, lr * 1.30 + time * -0.39); }
	p = rot2(p.y * -2.53 + time * 0.92) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.23), field(p, time, 2.46));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
