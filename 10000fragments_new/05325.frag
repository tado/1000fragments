uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.58) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 1.29 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.48), cos(time * 1.25)) * 0.25;
	float an = atan(p.y, p.x) + time * -0.66;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.14 / 3.1415927, 0.38 / r + time * 2.53);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.18, 0.95, 0.91) * (0.14 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= clamp(r * 1.39, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
