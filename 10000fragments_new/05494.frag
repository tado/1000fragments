uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.36 + 0.18 * pow(abs(cos(ra * 4.0 + t * 1.82)), 0.92);
    v = sin((rr - pet) * 9.70 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.37 / 3.1415927, 0.64 / r + time * 1.89);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.86 + time * 0.11, vec3(0.44, 0.43, 0.48), vec3(0.45, 0.37, 0.44), vec3(0.94, 0.79, 1.25), vec3(0.57, 0.95, 0.99));
	col *= clamp(r * 2.60, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
