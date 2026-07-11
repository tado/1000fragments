uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.73) - 0.5;
    float rad = 0.25 + 0.12 * sin(t * 0.81 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.68;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.93 / 3.1415927, 0.92 / r - time * 0.74);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.77, 0.89, 0.62) + vec3(0.08, 0.18, 0.10);
	col *= clamp(r * 2.74, 0.0, 1.0);
	col = fract(col * 2.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
