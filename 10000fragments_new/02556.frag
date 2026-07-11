uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.95 + sr * 16.06 - t * 3.11 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.49), cos(time * 0.42)) * 0.21;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.35 / 3.1415927, 1.18 / r + time * 1.01);
	tv.x += tv.y * 0.15;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.46, 0.30, 0.72) * (0.23 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= clamp(r * 2.48, 0.0, 1.0);
	col *= 0.85 + 0.14 * sin(gl_FragCoord.y * 1.42 + time * 6.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
