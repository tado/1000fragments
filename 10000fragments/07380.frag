uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.95 + vec2(t * 2.57, -t * 2.57) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 2.01 * p.y + time * 0.93); p.y += 0.47 / wf * cos(wf * 2.91 * p.x + time * 1.98); }
	{ p = vec2(atan(p.y, p.x) * 2.13, length(p) * 4.87 - time * 0.70); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.25, 0.30, 0.59), vec3(0.53, 0.63, 0.61), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
