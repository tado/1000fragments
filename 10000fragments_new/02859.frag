uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.90 + t * 4.46 + ph) + sin(p.y * 3.22 - t * 4.46 + ph)
        + sin((p.x + p.y) * 8.69 + t * 4.46 + ph) + sin(length(p) * 13.79 - t * 4.46 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.41), cos(time * 1.09)) * 0.14;
	float an = atan(p.y, p.x) + time * 0.73;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.08 / 3.1415927, 1.30 / r - time * 1.71);
	tv.x += tv.y * 0.25;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.23, 0.09, 0.37), vec3(0.64, 0.86, 0.68), cc);
	col *= clamp(r * 2.35, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
