uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 6.92 + ga * 3.0 - t * 2.62 + ph);
    v = arm * exp(-gr * 0.86);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.10;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.55 / 3.1415927, 0.71 / r + time * 1.64);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.66 + time * 0.25);
	col *= clamp(r * 2.85, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
