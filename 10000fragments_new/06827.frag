uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.52 + 0.18 * pow(abs(cos(ra * 2.0 + t * 2.04)), 2.99);
    v = sin((rr - pet) * 14.66 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.41), cos(time * 1.42)) * 0.12;
	float an = atan(p.y, p.x) + time * -0.59;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.05 / 3.1415927, 1.19 / r - time * 1.56);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.31, 0.31, 0.10), vec3(0.66, 0.92, 0.70), cc);
	col *= clamp(r * 1.29, 0.0, 1.0);
	col = clamp((col - 0.5) * 2.02 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
