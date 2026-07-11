uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.00 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.12 + t * 3.26 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.00 * sin(mf + 3.0) + ph), cos(t * 0.72 * cos(mf + 3.0) + ph));
        ms += 0.028 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	p = rot2(time * 1.45) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.72);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.92 + time * 0.05, vec3(0.47, 0.40, 0.54), vec3(0.43, 0.38, 0.34), vec3(1.28, 0.85, 0.87), vec3(0.39, 0.48, 0.01));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
