uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.06 + t * 2.02 + ph) + sin(p.y * 13.60 - t * 2.02 + ph)
        + sin((p.x + p.y) * 4.99 + t * 2.02 + ph) + sin(length(p) * 10.68 - t * 2.02 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.65), cos(time * 1.50)) * 0.09;
	float an = atan(p.y, p.x) + time * 0.35;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.14 / 3.1415927, 1.28 / r - time * 2.46);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.77, 0.16, 0.75) * (0.09 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col *= clamp(r * 2.72, 0.0, 1.0);
	col *= 0.82 + 0.11 * sin(gl_FragCoord.y * 1.82 + time * 8.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
