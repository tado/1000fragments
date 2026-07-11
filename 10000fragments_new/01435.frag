uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.19 + vec2(t * 0.37, -t * 0.42) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.46), cos(time * 1.16)) * 0.24;
	float an = atan(p.y, p.x) + time * -0.74;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.32 / 3.1415927, 0.95 / r - time * 1.08);
	tv.x += tv.y * 0.33;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.36, 1.09, 0.75) + vec3(0.14, 0.11, 0.04);
	col *= clamp(r * 2.50, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
