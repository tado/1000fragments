uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.76) - 0.5;
    float rad = 0.36 + 0.12 * sin(t * 0.90 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.44), cos(time * 1.30)) * 0.15;
	float an = atan(p.y, p.x) + time * 0.38;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.56 / 3.1415927, 0.51 / r + time * 1.72);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.13 + time * 0.40);
	col *= clamp(r * 1.95, 0.0, 1.0);
	col = mod(col * 1.74, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
