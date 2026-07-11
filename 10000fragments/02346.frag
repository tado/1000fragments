uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.33 + 0.24 * cos(sa * 5 + t * 0.81 + ph);
    v = sin((sr - petal) * 17.76);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(0.31, -0.95) * sin(length(p) * 5.73 - time * 0.93) * 0.16;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 3.11 * p.y + time * 1.32); p.y += 0.30 / wf * cos(wf * 1.72 * p.x + time * 0.90); }
	p *= 1.75;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.73), field(p, time, 1.47));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
