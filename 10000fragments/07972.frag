uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.79 + sr * 14.48 - t * 3.48 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.84;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.50 / wf * sin(wf * 3.65 * p.y + time * 1.15); p.y += 0.39 / wf * cos(wf * 2.15 * p.x + time * 0.83); }
	p += vec2(0.26, -0.35) * sin(length(p) * 4.20 - time * 1.14) * 0.14;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.11), field(p, time, 2.23));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
