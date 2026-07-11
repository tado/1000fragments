uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.43 + sr * 17.06 - t * 2.86 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.47), cos(time * 0.47)) * 0.05;
	float an = atan(p.y, p.x) + time * 0.58;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.74 / 3.1415927, 0.72 / r + time * 0.73);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.96, 0.70, 0.76) * (0.20 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= clamp(r * 1.18, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
