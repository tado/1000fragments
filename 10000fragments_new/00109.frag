uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.06) - 0.5;
    float rad = 0.28 + 0.12 * sin(t * 3.08 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.54;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.50 / 3.1415927, 1.36 / r - time * 2.00);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.30, 0.96, 1.09) + vec3(0.22, 0.01, 0.13);
	col *= clamp(r * 2.11, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
