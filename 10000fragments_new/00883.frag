uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.82 + sin(p.y * 2.71 + t * 5.84) * 4.21 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.08), cos(time * 1.09)) * 0.08;
	float an = atan(p.y, p.x) + time * -0.40;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.28 / 3.1415927, 1.04 / r - time * 2.71);
	tv.x += tv.y * 0.18;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.19, 0.34, 0.02), vec3(0.87, 0.80, 0.95), cc);
	col *= clamp(r * 2.85, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
