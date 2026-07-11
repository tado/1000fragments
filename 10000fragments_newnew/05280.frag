uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 6.59 + ga * 3.0 - t * 1.85 + ph);
    v = arm * exp(-gr * 1.19);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.36;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.26 / 3.1415927, 0.72 / r + time * 1.69);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.19, 0.05, 0.11), vec3(0.77, 0.82, 0.65), cc);
	col *= clamp(r * 1.59, 0.0, 1.0);
	col = fract(col * 1.51);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
