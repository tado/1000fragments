uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.35 + 0.10 * cos(sa * 6 + t * 1.93 + ph);
    v = sin((sr - petal) * 10.84);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.94;
	{ p = vec2(atan(p.y, p.x) * 2.43, length(p) * 5.21 - time * 0.11); }
	p = rot2(p.y * 1.42 + time * 0.14) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 3.24 * p.y + time * 1.05); p.y += 0.32 / wf * cos(wf * 2.39 * p.x + time * 1.88); }
	{ float fr = length(p); p *= 1.0 + 0.21 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.28), field(p, time, 2.56));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
