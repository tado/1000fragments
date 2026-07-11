uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.12 + sr * 18.12 - t * 1.10 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.88 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.49 + t * 2.05 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.15;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 3.00 * p.y + time * 2.10); p.y += 0.40 / wf * cos(wf * 2.36 * p.x + time * 2.12); }
	p = rot2(0.91) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.18);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.70 + time * 0.09, vec3(0.44, 0.51, 0.47), vec3(0.41, 0.35, 0.45), vec3(1.02, 0.85, 1.20), vec3(0.31, 0.18, 0.78));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
