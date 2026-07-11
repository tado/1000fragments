uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.29 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.22 + t * 2.56 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.82), cos(time * 1.30)) * 0.23;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.74 / 3.1415927, 1.10 / r + time * 1.84);
	tv.x += tv.y * 0.11;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.13 + time * 0.10, vec3(0.43, 0.54, 0.45), vec3(0.40, 0.48, 0.50), vec3(1.36, 1.21, 1.33), vec3(0.83, 0.22, 0.31));
	col *= clamp(r * 1.69, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.73 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
