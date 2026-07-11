uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.56 + vec2(t * 2.08, -t * 2.02) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.44), cos(time * 1.34)) * 0.11;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.65 / 3.1415927, 0.69 / r - time * 1.61);
	tv.x += tv.y * 0.38;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.27, 0.86, 1.27) + vec3(0.07, 0.01, 0.03);
	col *= clamp(r * 1.05, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
