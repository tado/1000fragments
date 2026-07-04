uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 6.38 + ga * 2.0 - t * 1.94 + ph);
    v = arm * exp(-gr * 1.33);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.85), cos(time * 1.04)) * 0.20;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.09 / 3.1415927, 0.84 / r + time * 0.75);
	tv.x += tv.y * 0.39;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.63, 0.53, 0.23) * (0.24 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col *= clamp(r * 1.62, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
