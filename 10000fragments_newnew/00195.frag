uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.05) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 1.63 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.74;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.95 / 3.1415927, 1.13 / r - time * 1.03);
	tv.x += tv.y * 0.17;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.92 + time * 0.57);
	col *= clamp(r * 2.98, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
