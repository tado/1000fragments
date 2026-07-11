uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.29 + t * 3.03 + ph) + sin(p.y * 12.42 - t * 3.03 + ph)
        + sin((p.x + p.y) * 5.90 + t * 3.03 + ph) + sin(length(p) * 9.13 - t * 3.03 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.75;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.25 / 3.1415927, 0.59 / r - time * 0.90);
	tv.x += tv.y * 0.49;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.69 + time * 0.75);
	col *= clamp(r * 2.30, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
