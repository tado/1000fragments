uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.21) - 0.5;
    float rad = 0.40 + 0.12 * sin(t * 1.58 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.47), cos(time * 1.12)) * 0.11;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.68 / 3.1415927, 0.77 / r - time * 2.83);
	tv.x += tv.y * 0.40;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.32, 0.25, 0.19), vec3(0.56, 0.72, 0.81), cc);
	col *= clamp(r * 1.38, 0.0, 1.0);
	col = fract(col * 1.92);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
