uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.73 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.94 + t * 2.20 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.19;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.41 / 3.1415927, 0.32 / r + time * 0.84);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.82 + time * 0.04, vec3(0.43, 0.49, 0.49), vec3(0.44, 0.38, 0.49), vec3(0.86, 1.12, 0.99), vec3(0.97, 0.00, 0.72));
	col *= clamp(r * 1.55, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
