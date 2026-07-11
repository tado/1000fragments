uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.50 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.35 + t * 3.81 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.37), cos(time * 0.72)) * 0.18;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.07 / 3.1415927, 0.81 / r - time * 1.51);
	tv.x += tv.y * 0.26;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.03 + time * 0.35, vec3(0.41, 0.48, 0.41), vec3(0.31, 0.39, 0.35), vec3(1.08, 0.97, 1.37), vec3(0.86, 0.87, 0.90));
	col *= clamp(r * 2.40, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
