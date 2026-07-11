uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.39 + 0.26 * pow(abs(cos(ra * 7.0 + t * 2.72)), 1.29);
    v = sin((rr - pet) * 15.66 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.97), cos(time * 1.27)) * 0.24;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.39 / 3.1415927, 0.98 / r + time * 2.33);
	tv.x += tv.y * 0.31;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.32 + time * 0.05, vec3(0.41, 0.43, 0.56), vec3(0.49, 0.31, 0.43), vec3(0.78, 1.40, 1.25), vec3(0.25, 0.86, 0.09));
	col *= clamp(r * 1.98, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
