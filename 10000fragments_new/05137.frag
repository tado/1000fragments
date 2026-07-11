uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.93 + t * 1.68 + ph) + sin(p.y * 13.31 - t * 1.68 + ph)
        + sin((p.x + p.y) * 8.01 + t * 1.68 + ph) + sin(length(p) * 4.51 - t * 1.68 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.72 / 3.1415927, 0.37 / r - time * 1.88);
	tv.x += tv.y * 0.25;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.11, 0.25, 0.12), vec3(0.58, 0.96, 0.89), cc);
	col *= clamp(r * 2.18, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
