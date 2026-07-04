uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 5.96 + ga * 5.0 - t * 3.00 + ph);
    v = arm * exp(-gr * 0.59);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.61), cos(time * 1.30)) * 0.18;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.74 / 3.1415927, 1.50 / r + time * 2.19);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.28, 0.33, 0.53), vec3(0.86, 0.56, 0.43), cc);
	col *= clamp(r * 1.18, 0.0, 1.0);
	col *= 0.85 + 0.14 * sin(gl_FragCoord.y * 2.58 + time * 15.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
