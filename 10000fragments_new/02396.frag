uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.26 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.67 + t * 3.36 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.81 / 3.1415927, 0.84 / r + time * 1.43);
	tv.x += tv.y * 0.25;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.83 + time * 0.19, vec3(0.59, 0.58, 0.40), vec3(0.44, 0.49, 0.49), vec3(1.34, 0.86, 1.17), vec3(0.96, 0.75, 0.89));
	col *= clamp(r * 1.62, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
