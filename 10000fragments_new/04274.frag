uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.24 + t * 2.06 + ph) + sin(p.y * 11.75 - t * 2.89 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.95), cos(time * 1.34)) * 0.13;
	float an = atan(p.y, p.x) + time * 0.51;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.19 / 3.1415927, 1.12 / r - time * 0.74);
	tv.x += tv.y * 0.12;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.35, 0.16, 0.54), vec3(0.84, 0.67, 0.55), cc);
	col *= clamp(r * 2.52, 0.0, 1.0);
	col *= 0.82 + 0.19 * sin(gl_FragCoord.y * 1.04 + time * 7.77);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
