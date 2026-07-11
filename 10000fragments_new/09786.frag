uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.20 + t * 3.65 + ph) + sin(p.y * 9.79 - t * 3.65 + ph)
        + sin((p.x + p.y) * 5.70 + t * 3.65 + ph) + sin(length(p) * 7.48 - t * 3.65 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.45), cos(time * 0.55)) * 0.07;
	float an = atan(p.y, p.x) + time * 0.46;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.72 / 3.1415927, 0.58 / r + time * 1.07);
	tv.x += tv.y * 0.33;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.17, 0.03, 0.28), vec3(0.91, 0.80, 0.89), cc);
	col *= clamp(r * 2.58, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
