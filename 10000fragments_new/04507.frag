uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.78 + sr * 22.46 - t * 1.36 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.49), cos(time * 1.05)) * 0.28;
	float an = atan(p.y, p.x) + time * 0.37;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.67 / 3.1415927, 0.40 / r + time * 0.87);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.75, 0.31, 0.83) * (0.18 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= clamp(r * 1.16, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.35 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
