uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.37 + 0.20 * pow(abs(cos(ra * 3.0 + t * 2.21)), 2.52);
    v = sin((rr - pet) * 20.27 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.77;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.03 / 3.1415927, 0.76 / r - time * 2.65);
	tv.x += tv.y * 0.26;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.35 + time * 0.39, vec3(0.41, 0.50, 0.55), vec3(0.31, 0.38, 0.48), vec3(1.09, 1.39, 1.31), vec3(0.98, 0.28, 0.71));
	col *= clamp(r * 1.52, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
