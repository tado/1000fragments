uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.72 + vec2(t * 2.71, -t * 0.74) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.46), cos(time * 0.44)) * 0.12;
	float an = atan(p.y, p.x) + time * -0.32;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.73 / 3.1415927, 1.03 / r - time * 2.92);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.15 + time * 0.32);
	col *= clamp(r * 2.22, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
