uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.75 + vec2(t * 0.89, -t * 1.01) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.50), cos(time * 1.16)) * 0.21;
	float an = atan(p.y, p.x) + time * -0.22;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.47 / 3.1415927, 1.38 / r + time * 2.78);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.04 + time * 0.43);
	col *= clamp(r * 2.82, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
