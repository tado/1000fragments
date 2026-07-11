uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 4.04 + ga * 3.0 - t * 2.31 + ph);
    v = arm * exp(-gr * 0.96);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.30;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.70 / 3.1415927, 1.28 / r - time * 2.79);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.02, 0.33, 0.28), vec3(0.82, 0.92, 0.80), cc);
	col *= clamp(r * 2.05, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
