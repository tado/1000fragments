uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.28 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.18 + t * 3.42 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.34;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.54 / 3.1415927, 0.68 / r + time * 2.42);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.44 + time * 0.20, vec3(0.57, 0.42, 0.42), vec3(0.33, 0.37, 0.40), vec3(0.97, 0.77, 1.35), vec3(0.27, 0.74, 0.10));
	col *= clamp(r * 2.49, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
