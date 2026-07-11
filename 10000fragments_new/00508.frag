uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.53 + 0.27 * pow(abs(cos(ra * 7.0 + t * 0.75)), 1.43);
    v = sin((rr - pet) * 11.53 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.82), cos(time * 0.50)) * 0.19;
	float an = atan(p.y, p.x) + time * 0.68;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.42 / 3.1415927, 0.92 / r + time * 2.89);
	tv.x += tv.y * 0.13;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.01, 0.13, 0.08), vec3(0.74, 0.68, 0.50), cc);
	col *= clamp(r * 2.92, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
