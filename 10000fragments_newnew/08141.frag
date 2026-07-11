uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.53 + 0.32 * pow(abs(cos(ra * 2.0 + t * 2.33)), 0.52);
    v = sin((rr - pet) * 20.09 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.48), cos(time * 1.30)) * 0.29;
	float an = atan(p.y, p.x) + time * 0.20;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.96 / 3.1415927, 1.07 / r + time * 2.01);
	tv.x += tv.y * 0.18;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.13, 0.26, 0.16), vec3(0.61, 0.69, 0.81), cc);
	col *= clamp(r * 2.54, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
