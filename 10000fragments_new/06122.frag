uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.90 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.51 + t * 2.64 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 3.02 * p.y + time * 1.14); p.y += 0.35 / wf * cos(wf * 3.96 * p.x + time * 1.85); }
	p = rot2(time * 0.83) * p;
	p *= 2.09;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.98 + time * 0.00, vec3(0.48, 0.56, 0.53), vec3(0.50, 0.49, 0.33), vec3(0.81, 1.19, 0.96), vec3(0.04, 0.88, 0.45));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
