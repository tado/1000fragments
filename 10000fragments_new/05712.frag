uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.39 + 0.23 * pow(abs(cos(ra * 4.0 + t * 2.44)), 2.95);
    v = sin((rr - pet) * 19.63 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.49), cos(time * 1.13)) * 0.14;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.41 / 3.1415927, 0.49 / r - time * 1.33);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.04, 0.39, 0.16), vec3(0.84, 0.82, 0.61), cc);
	col *= clamp(r * 1.72, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
