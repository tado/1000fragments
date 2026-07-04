uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.47 + 0.16 * pow(abs(cos(ra * 6.0 + t * 2.91)), 1.03);
    v = sin((rr - pet) * 10.85 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.37;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.45 / 3.1415927, 1.46 / r - time * 2.61);
	tv.x += tv.y * 0.14;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.94 + time * 0.25, vec3(0.58, 0.53, 0.52), vec3(0.43, 0.34, 0.35), vec3(1.19, 0.76, 0.75), vec3(0.03, 0.78, 0.28));
	col *= clamp(r * 2.40, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
