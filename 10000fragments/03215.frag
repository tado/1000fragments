uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.22 + vec2(t * 2.68, -t * 2.68) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.37;
	p *= 2.94;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 2.39 * p.y + time * 1.59); p.y += 0.30 / wf * cos(wf * 3.16 * p.x + time * 1.52); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.01, 0.18, 0.56), vec3(0.80, 0.72, 0.57), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
