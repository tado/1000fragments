uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.17 + sr * 20.59 - t * 2.34 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.57;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 2.53 * p.y + time * 1.50); p.y += 0.35 / wf * cos(wf * 1.95 * p.x + time * 1.95); }
	p *= 2.06;
	{ float fr = length(p); p *= 1.0 + -0.32 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.46, 0.12, 0.10), vec3(1.00, 0.79, 0.46), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
