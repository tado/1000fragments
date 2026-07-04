uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.71) - 0.5;
    float rad = 0.43 + 0.12 * sin(t * 1.49 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.25), cos(time * 0.95)) * 0.05;
	float an = atan(p.y, p.x) + time * -0.53;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.68 / 3.1415927, 1.01 / r + time * 2.55);
	tv.x += tv.y * 0.45;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.19, 0.18, 0.17), vec3(0.60, 0.85, 0.98), cc);
	col *= clamp(r * 1.67, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.78 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
