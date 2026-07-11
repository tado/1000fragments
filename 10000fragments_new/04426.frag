uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.41) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 0.88 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.75), cos(time * 0.92)) * 0.20;
	float an = atan(p.y, p.x) + time * 0.30;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.35 / 3.1415927, 0.57 / r - time * 2.60);
	tv.x += tv.y * 0.22;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.14, 0.03, 0.52), vec3(0.87, 0.93, 0.85), cc);
	col *= clamp(r * 1.79, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
