uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.47 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.46 + t * 1.18 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.07 / 3.1415927, 0.70 / r - time * 1.77);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.67 + time * 0.29, vec3(0.52, 0.58, 0.49), vec3(0.33, 0.31, 0.41), vec3(1.11, 1.23, 1.29), vec3(0.52, 0.73, 0.17));
	col *= clamp(r * 2.88, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
