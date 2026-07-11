uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.18 + t * 4.29 + ph) + sin(p.y * 15.48 - t * 1.13 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.19), cos(time * 0.61)) * 0.17;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.83 / 3.1415927, 0.66 / r + time * 2.18);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.04, 0.40, 0.44), vec3(0.62, 0.67, 0.41), cc);
	col *= clamp(r * 2.67, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.88 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
