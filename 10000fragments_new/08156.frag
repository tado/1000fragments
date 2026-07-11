uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.36 + 0.20 * pow(abs(cos(ra * 6.0 + t * 2.01)), 0.54);
    v = sin((rr - pet) * 8.33 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.35), cos(time * 0.63)) * 0.07;
	float an = atan(p.y, p.x) + time * -0.43;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.65 / 3.1415927, 0.86 / r + time * 2.34);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.17, 0.19, 0.20), vec3(0.86, 0.56, 0.52), cc);
	col *= clamp(r * 1.02, 0.0, 1.0);
	col = fract(col * 1.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
