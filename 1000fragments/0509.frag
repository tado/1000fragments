uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.38 + 0.20 * cos(sa * 8.0 + t * 0.99 + ph);
    v = sin((sr - petal) * 8.64);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.68), cos(time * 0.42)) * 0.09;
	float an = atan(p.y, p.x) + time * -0.43;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.75 / 3.1415927, 0.32 / r + time * 1.72);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.47, 0.43, 0.29) * (0.06 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= clamp(r * 1.57, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
