uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.84 + vec2(t * 0.81, -t * 2.05) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.45), cos(time * 1.32)) * 0.20;
	float an = atan(p.y, p.x) + time * 0.59;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.37 / 3.1415927, 0.67 / r - time * 2.78);
	tv.x += tv.y * 0.21;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.78 + time * 0.67);
	col *= clamp(r * 1.46, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
