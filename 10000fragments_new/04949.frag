uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.91 + vec2(t * 1.17, -t * 1.00) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.39), cos(time * 1.24)) * 0.20;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.38 / 3.1415927, 1.18 / r + time * 2.99);
	tv.x += tv.y * 0.27;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.75 + time * 0.13);
	col *= clamp(r * 2.16, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
