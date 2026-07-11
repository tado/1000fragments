uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.08 + sin(p.y * 4.21 + t * 3.94) * 3.03 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.72), cos(time * 0.57)) * 0.18;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.85 / 3.1415927, 1.01 / r - time * 1.43);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.07, 0.23, 0.47), vec3(0.81, 0.79, 0.69), cc);
	col *= clamp(r * 2.48, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
