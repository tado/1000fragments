uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.53 + vec2(t * 2.05, -t * 2.02) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.10), cos(time * 1.00)) * 0.08;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.23 / 3.1415927, 0.80 / r + time * 1.64);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(1.00, 0.21, 0.49) * (0.13 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col *= clamp(r * 1.10, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
