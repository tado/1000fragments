uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.53 + sin(p.y * 5.42 + t * 4.73) * 2.06 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.63;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 1.88, length(p) * 5.73 - time * 0.19); }
	p = abs(p);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 3.45 * p.y + time * 0.77); p.y += 0.20 / wf * cos(wf * 1.90 * p.x + time * 2.00); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.99, 1.13, 1.25) + vec3(0.22, 0.01, 0.13);
	col = mod(col * 1.89, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
