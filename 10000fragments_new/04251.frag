uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.77 + t * 1.01 + ph) + sin(p.y * 12.80 - t * 1.01 + ph)
        + sin((p.x + p.y) * 3.47 + t * 1.01 + ph) + sin(length(p) * 16.59 - t * 1.01 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.43 / 3.1415927, 0.85 / r - time * 0.92);
	tv.x += tv.y * 0.33;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.26 + time * 0.41);
	col *= clamp(r * 1.04, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
