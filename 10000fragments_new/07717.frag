uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.47 + t * 2.80 + ph) + sin(p.y * 4.54 - t * 2.79 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.42), cos(time * 0.42)) * 0.14;
	float an = atan(p.y, p.x) + time * 0.47;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.63 / 3.1415927, 0.93 / r - time * 1.47);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.24, 0.31, 0.25) * (0.13 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= clamp(r * 1.68, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.53 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
