uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.24 + sr * 16.31 - t * 3.23 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 1.52 * p.y + time * 1.88); p.y += 0.32 / wf * cos(wf * 3.01 * p.x + time * 1.59); }
	p *= 2.27;
	{ float fr = length(p); p *= 1.0 + 0.45 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.15, 0.69, 0.48) * (0.10 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.50 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
