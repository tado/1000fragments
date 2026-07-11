uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 3.94 + ga * 4.0 - t * 1.47 + ph);
    v = arm * exp(-gr * 0.92);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.27), cos(time * 1.48)) * 0.09;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.51 / 3.1415927, 0.42 / r - time * 1.07);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.47 + time * 0.08);
	col *= clamp(r * 1.15, 0.0, 1.0);
	col = fract(col * 2.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
