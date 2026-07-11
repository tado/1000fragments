uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 3.86 + ga * 4.0 - t * 2.14 + ph);
    v = arm * exp(-gr * 0.70);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.61), cos(time * 0.48)) * 0.19;
	float an = atan(p.y, p.x) + time * -0.11;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.10 / 3.1415927, 1.47 / r + time * 2.02);
	tv.x += tv.y * 0.48;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.76, 0.83, 0.87) * (0.17 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= clamp(r * 1.36, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
