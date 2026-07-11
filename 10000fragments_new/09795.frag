uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.52 + t * 2.17 + ph) + sin(p.y * 13.66 - t * 0.74 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.82 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.47 + t * 1.59 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.09;
	p = rot2(time * 1.25) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.24);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.16 + time * 0.08, vec3(0.51, 0.41, 0.58), vec3(0.44, 0.44, 0.46), vec3(0.90, 1.05, 1.31), vec3(0.52, 0.38, 0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
