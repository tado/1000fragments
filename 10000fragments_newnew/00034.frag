uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.05 + t * 2.71 + ph) + sin(p.y * 13.96 - t * 2.71 + ph)
        + sin((p.x + p.y) * 3.31 + t * 2.71 + ph) + sin(length(p) * 15.30 - t * 2.71 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.46), cos(time * 0.94)) * 0.10;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.50 / 3.1415927, 0.88 / r - time * 1.60);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.14, 0.32, 0.54), vec3(0.65, 0.89, 0.41), cc);
	col *= clamp(r * 2.18, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
