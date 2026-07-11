uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.56 + vec2(t * 1.00, -t * 2.61) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.81), cos(time * 0.99)) * 0.30;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.57 / 3.1415927, 1.29 / r + time * 0.78);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.28, 0.32, 0.30), vec3(0.89, 0.73, 0.82), cc);
	col *= clamp(r * 2.29, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
