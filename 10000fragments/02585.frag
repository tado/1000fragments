uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 6.25 + ga * 2.0 - t * 0.64 + ph);
    v = arm * exp(-gr * 0.58);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.42), cos(time * 0.50)) * 0.22;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.54 / 3.1415927, 1.20 / r - time * 0.61);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.65 + time * 0.26);
	col *= clamp(r * 1.87, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
