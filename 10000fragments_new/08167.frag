uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.10 + t * 2.41 + ph) + sin(p.y * 3.29 - t * 2.41 + ph)
        + sin((p.x + p.y) * 4.17 + t * 2.41 + ph) + sin(length(p) * 4.52 - t * 2.41 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.84 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.78 + t * 2.13 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.37;
	p = fract(p * 2.97) - 0.5;
	p += vec2(0.73, -0.97) * sin(length(p) * 5.62 - time * 0.96) * 0.16;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.69);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.54 + time * 0.25, vec3(0.43, 0.41, 0.54), vec3(0.36, 0.41, 0.37), vec3(0.98, 0.74, 1.17), vec3(0.53, 0.69, 0.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
