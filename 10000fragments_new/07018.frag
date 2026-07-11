uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 20.34 + sin(p.y * 5.33 + t * 1.50) * 1.20 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.78), cos(time * 1.13)) * 0.25;
	float an = atan(p.y, p.x) + time * 0.16;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.61 / 3.1415927, 1.18 / r - time * 1.35);
	tv.x += tv.y * 0.25;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.02, 0.21, 0.25), vec3(0.91, 0.71, 0.66), cc);
	col *= clamp(r * 1.03, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.18 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
