uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.48) - 0.5;
    float rad = 0.41 + 0.12 * sin(t * 3.96 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.76;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.68 / 3.1415927, 0.81 / r + time * 1.93);
	tv.x += tv.y * 0.20;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.24, 1.32, 0.60) + vec3(0.14, 0.01, 0.13);
	col *= clamp(r * 2.37, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.01 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
