uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.48) - 0.5;
    float rad = 0.36 + 0.12 * sin(t * 1.10 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.38), cos(time * 0.43)) * 0.18;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.25 / 3.1415927, 0.98 / r - time * 2.25);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(1.00, 0.64, 0.62) * (0.20 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col *= clamp(r * 2.03, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
