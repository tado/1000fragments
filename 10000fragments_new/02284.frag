uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.46 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.16 + t * 1.79 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.92;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.42 + time * 0.13, vec3(0.44, 0.59, 0.43), vec3(0.47, 0.31, 0.47), vec3(1.16, 0.93, 0.92), vec3(0.80, 0.62, 0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
