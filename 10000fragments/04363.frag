uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.69) - 0.5;
    float rad = 0.42 + 0.12 * sin(t * 2.50 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.30 / 3.1415927, 1.45 / r - time * 2.08);
	tv.x += tv.y * 0.34;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.86, 0.82, 1.35) + vec3(0.10, 0.20, 0.17);
	col *= clamp(r * 2.25, 0.0, 1.0);
	col *= 0.82 + 0.16 * sin(gl_FragCoord.y * 0.99 + time * 9.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
