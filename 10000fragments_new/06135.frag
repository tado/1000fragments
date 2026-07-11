uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.34 + t * 0.62 + ph) + sin(p.y * 13.58 - t * 0.62 + ph)
        + sin((p.x + p.y) * 10.87 + t * 0.62 + ph) + sin(length(p) * 7.26 - t * 0.62 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.51), cos(time * 1.08)) * 0.09;
	float an = atan(p.y, p.x) + time * 0.64;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.23 / 3.1415927, 1.17 / r - time * 0.64);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.92, 0.47, 0.73) * (0.09 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= clamp(r * 2.01, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
