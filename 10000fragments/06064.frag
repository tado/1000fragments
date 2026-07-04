uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 4.32 + ga * 5.0 - t * 2.64 + ph);
    v = arm * exp(-gr * 0.92);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.44), cos(time * 0.91)) * 0.10;
	float an = atan(p.y, p.x) + time * -0.15;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.31 / 3.1415927, 0.86 / r + time * 2.73);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.95 + time * 0.22);
	col *= clamp(r * 1.98, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
