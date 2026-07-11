uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.34 + vec2(t * 1.17, -t * 0.40) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.59), cos(time * 0.61)) * 0.24;
	float an = atan(p.y, p.x) + time * -0.23;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.23 / 3.1415927, 0.49 / r - time * 2.51);
	tv.x += tv.y * 0.48;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.33, 0.72, 1.48) + vec3(0.10, 0.10, 0.22);
	col *= clamp(r * 1.19, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
