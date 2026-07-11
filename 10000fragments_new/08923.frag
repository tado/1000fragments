uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.47, 0.0)) * 29.89 - t * 6.24 + ph);
    float mb = sin(length(p + vec2(0.47, 0.0)) * 34.07 - t * 4.10 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.67 * fr * fr; }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 2.03 * p.y + time * 0.99); p.y += 0.27 / wf * cos(wf * 1.63 * p.x + time * 2.09); }
	p = abs(p);
	p += vec2(0.51, -0.23) * sin(length(p) * 5.26 - time * 0.92) * 0.12;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.37, 0.15, 0.58), vec3(0.98, 0.69, 0.67), d);
	col = clamp((col - 0.5) * 1.39 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
