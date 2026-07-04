uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 7.63 + ga * 2.0 - t * 2.26 + ph);
    v = arm * exp(-gr * 0.85);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.91), cos(time * 0.58)) * 0.08;
	float an = atan(p.y, p.x) + time * -0.17;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.51 / 3.1415927, 1.45 / r - time * 1.01);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.30, 0.11, 0.09), vec3(0.96, 0.57, 0.72), cc);
	col *= clamp(r * 2.41, 0.0, 1.0);
	col *= 0.87 + 0.16 * sin(gl_FragCoord.y * 1.39 + time * 17.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
