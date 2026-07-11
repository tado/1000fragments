uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.24) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 3.73 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.81), cos(time * 1.19)) * 0.11;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.25 / 3.1415927, 0.73 / r - time * 2.15);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.44, 0.19, 0.57) * (0.17 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col *= clamp(r * 1.14, 0.0, 1.0);
	col *= 0.81 + 0.16 * sin(gl_FragCoord.y * 0.81 + time * 14.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
