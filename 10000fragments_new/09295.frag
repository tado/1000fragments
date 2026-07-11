uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.77 + sr * 5.59 - t * 4.64 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.12), cos(time * 1.47)) * 0.09;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.97 / 3.1415927, 0.56 / r - time * 2.77);
	tv.x += tv.y * 0.44;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.72, 0.75, 0.47) * (0.24 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 1.99, 0.0, 1.0);
	col *= 0.86 + 0.13 * sin(gl_FragCoord.y * 2.97 + time * 17.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
