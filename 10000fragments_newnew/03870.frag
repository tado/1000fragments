uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 5.12 + ga * 4.0 - t * 2.84 + ph);
    v = arm * exp(-gr * 0.65);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.17), cos(time * 0.96)) * 0.26;
	float an = atan(p.y, p.x) + time * 0.59;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.98 / 3.1415927, 1.44 / r - time * 2.30);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(1.00, 1.00, 0.42) * (0.11 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col *= clamp(r * 1.75, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
