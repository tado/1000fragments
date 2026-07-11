uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.50 + t * 4.43 + ph) + sin(p.y * 8.20 - t * 4.43 + ph)
        + sin((p.x + p.y) * 7.86 + t * 4.43 + ph) + sin(length(p) * 10.59 - t * 4.43 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.98), cos(time * 0.72)) * 0.29;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.83 / 3.1415927, 1.21 / r - time * 2.43);
	tv.x += tv.y * 0.40;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.29, 0.30, 0.23), vec3(0.95, 0.81, 0.51), cc);
	col *= clamp(r * 2.30, 0.0, 1.0);
	col *= 0.89 + 0.19 * sin(gl_FragCoord.y * 1.65 + time * 4.53);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
