uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.43 + 0.20 * pow(abs(cos(ra * 6.0 + t * 1.02)), 2.57);
    v = sin((rr - pet) * 17.66 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.68;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 3.65 * p.y + time * 0.86); p.y += 0.45 / wf * cos(wf * 1.56 * p.x + time * 1.51); }
	{ p = vec2(atan(p.y, p.x) * 1.59, length(p) * 5.43 - time * 0.25); }
	{ float fr = length(p); p *= 1.0 + 0.60 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.05, 0.99, 0.84) + vec3(0.27, 0.19, 0.16);
	col = mod(col * 2.75, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
