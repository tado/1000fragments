uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.71 + t * 0.54 + ph) + sin(p.y * 6.24 - t * 0.54 + ph)
        + sin((p.x + p.y) * 11.79 + t * 0.54 + ph) + sin(length(p) * 4.62 - t * 0.54 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.17), cos(time * 0.44)) * 0.13;
	float an = atan(p.y, p.x) + time * 0.20;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.93 / 3.1415927, 1.00 / r - time * 1.60);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.51 + time * 0.58);
	col *= clamp(r * 2.41, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
