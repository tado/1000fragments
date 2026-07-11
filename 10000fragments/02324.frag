uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.56 + 0.24 * cos(sa * 4 + t * 1.83 + ph);
    v = sin((sr - petal) * 13.38);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.34;
	{ float fr = length(p); p *= 1.0 + -0.69 * fr * fr; }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 3.13 * p.y + time * 1.12); p.y += 0.41 / wf * cos(wf * 2.25 * p.x + time * 1.23); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.71), field(p, time, 1.43));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.99, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
