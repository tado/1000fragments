uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.38 + 0.17 * pow(abs(cos(ra * 5.0 + t * 1.06)), 2.26);
    v = sin((rr - pet) * 18.92 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.49), cos(time * 1.17)) * 0.12;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.35 / 3.1415927, 1.27 / r - time * 2.01);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.26, vec3(0.40, 0.58, 0.41), vec3(0.45, 0.42, 0.48), vec3(0.93, 0.73, 1.14), vec3(0.48, 0.51, 0.71));
	col *= clamp(r * 2.25, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.21));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
