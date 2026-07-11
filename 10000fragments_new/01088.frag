uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.06 + t * 2.81 + ph) + sin(p.y * 4.29 - t * 2.81 + ph)
        + sin((p.x + p.y) * 10.52 + t * 2.81 + ph) + sin(length(p) * 14.50 - t * 2.81 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.73 / 3.1415927, 1.31 / r + time * 2.71);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.07, 0.03, 0.29), vec3(0.69, 0.86, 0.63), cc);
	col *= clamp(r * 2.20, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
