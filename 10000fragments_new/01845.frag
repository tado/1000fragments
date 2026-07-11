uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.32 + vec2(t * 2.92, -t * 1.52) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.95), cos(time * 1.46)) * 0.08;
	float an = atan(p.y, p.x) + time * 0.31;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.34 / 3.1415927, 0.56 / r + time * 1.53);
	tv.x += tv.y * 0.21;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.65 + time * 0.91);
	col *= clamp(r * 1.68, 0.0, 1.0);
	col *= 0.87 + 0.15 * sin(gl_FragCoord.y * 2.94 + time * 7.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
