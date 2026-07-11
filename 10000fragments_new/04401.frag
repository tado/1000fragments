uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.71 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.14 + t * 3.69 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.10), cos(time * 0.99)) * 0.21;
	float an = atan(p.y, p.x) + time * 0.25;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.72 / 3.1415927, 1.01 / r + time * 0.91);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.17 + time * 0.84);
	col *= clamp(r * 2.08, 0.0, 1.0);
	col = fract(col * 2.38);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
