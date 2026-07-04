uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.85 + sr * 20.74 - t * 1.22 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.45), cos(time * 1.40)) * 0.09;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.63 / 3.1415927, 1.21 / r + time * 1.56);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.25, 0.55, 0.27) * (0.16 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= clamp(r * 2.90, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.76 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
