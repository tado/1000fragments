uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.85 + vec2(t * 1.42, -t * 1.97) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.46), cos(time * 0.59)) * 0.15;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.68 / 3.1415927, 1.19 / r + time * 1.43);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.20, 0.29, 0.25), vec3(0.78, 0.97, 0.56), cc);
	col *= clamp(r * 2.22, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
