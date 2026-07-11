uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.95 + sr * 19.80 - t * 3.17 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p);
	{ float fr = length(p); p *= 1.0 + 0.80 * fr * fr; }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 3.68 * p.y + time * 1.28); p.y += 0.34 / wf * cos(wf * 2.19 * p.x + time * 1.55); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.32), field(p, time, 0.64));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
