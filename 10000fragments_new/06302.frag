uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.24 + t * 1.34 + ph) + sin(p.y * 9.62 - t * 1.34 + ph)
        + sin((p.x + p.y) * 2.72 + t * 1.34 + ph) + sin(length(p) * 7.93 - t * 1.34 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.47), cos(time * 0.46)) * 0.22;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.07 / 3.1415927, 0.33 / r + time * 2.01);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.10, 0.19, 0.22), vec3(0.95, 0.96, 0.54), cc);
	col *= clamp(r * 1.54, 0.0, 1.0);
	col = fract(col * 2.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
