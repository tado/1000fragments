uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 3.98 + ga * 3.0 - t * 2.45 + ph);
    v = arm * exp(-gr * 1.31);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.54 / 3.1415927, 1.12 / r + time * 1.22);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.08, 0.18, 0.30), vec3(0.58, 0.73, 0.66), cc);
	col *= clamp(r * 2.24, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
