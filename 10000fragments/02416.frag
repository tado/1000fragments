uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.46 + 0.13 * cos(sa * 7 + t * 1.84 + ph);
    v = sin((sr - petal) * 13.70);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.77;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 2.98 * p.y + time * 1.95); p.y += 0.29 / wf * cos(wf * 1.65 * p.x + time * 1.56); }
	p = rot2(length(p) * 2.34 + time * 0.22) * p;
	p = rot2(1.84) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.20, lr * 1.22 + time * -0.11); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.12), field(p, time, 2.24));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
