uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.96 + t * 4.10 + ph) + sin(p.y * 3.13 - t * 4.10 + ph)
        + sin((p.x + p.y) * 7.98 + t * 4.10 + ph) + sin(length(p) * 9.22 - t * 4.10 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.48), cos(time * 1.28)) * 0.26;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.49 / 3.1415927, 0.59 / r - time * 1.87);
	tv.x += tv.y * 0.22;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.28, 0.35, 0.43), vec3(0.74, 0.65, 0.53), cc);
	col *= clamp(r * 1.91, 0.0, 1.0);
	col = mod(col * 1.99, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
