uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.68 + t * 1.25 + ph) + sin(p.y * 4.01 - t * 1.25 + ph)
        + sin((p.x + p.y) * 11.78 + t * 1.25 + ph) + sin(length(p) * 17.83 - t * 1.25 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.48;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.98 / 3.1415927, 0.66 / r - time * 0.72);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.05 + time * 0.02);
	col *= clamp(r * 2.14, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.16 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
