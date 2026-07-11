uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.92 + t * 2.93 + ph) + sin(p.y * 12.71 - t * 2.93 + ph)
        + sin((p.x + p.y) * 4.40 + t * 2.93 + ph) + sin(length(p) * 14.98 - t * 2.93 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.60), cos(time * 1.00)) * 0.24;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.69 / 3.1415927, 1.23 / r + time * 2.74);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.01, 0.02, 0.04), vec3(0.97, 0.80, 0.86), cc);
	col *= clamp(r * 2.91, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
