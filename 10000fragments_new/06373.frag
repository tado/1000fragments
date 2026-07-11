uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.09) - 0.5;
    float rad = 0.38 + 0.12 * sin(t * 1.86 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.76), cos(time * 0.74)) * 0.16;
	float an = atan(p.y, p.x) + time * 0.74;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.93 / 3.1415927, 0.55 / r - time * 0.91);
	tv.x += tv.y * 0.49;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.55 + time * 0.86);
	col *= clamp(r * 2.65, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
