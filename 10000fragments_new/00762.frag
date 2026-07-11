uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.39 + t * 1.03 + ph) + sin(p.y * 5.59 - t * 1.03 + ph)
        + sin((p.x + p.y) * 2.44 + t * 1.03 + ph) + sin(length(p) * 9.90 - t * 1.03 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.90), cos(time * 1.42)) * 0.08;
	float an = atan(p.y, p.x) + time * -0.31;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.15 / 3.1415927, 0.32 / r + time * 1.35);
	tv.x += tv.y * 0.19;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.11, 0.68, 1.40) + vec3(0.15, 0.23, 0.02);
	col *= clamp(r * 1.85, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
