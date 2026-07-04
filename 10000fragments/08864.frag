uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.69 + t * 4.06 + ph) + sin(p.y * 5.21 - t * 4.06 + ph)
        + sin((p.x + p.y) * 2.74 + t * 4.06 + ph) + sin(length(p) * 12.96 - t * 4.06 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.12;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.88 / 3.1415927, 0.91 / r - time * 2.36);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.62 + time * 0.15);
	col *= clamp(r * 2.42, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.70 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
