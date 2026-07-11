uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.51 + 0.33 * pow(abs(cos(ra * 2.0 + t * 1.90)), 2.11);
    v = sin((rr - pet) * 8.89 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.48;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.70 / 3.1415927, 0.72 / r - time * 0.98);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.07 + time * 0.16, vec3(0.56, 0.40, 0.54), vec3(0.34, 0.33, 0.45), vec3(0.78, 0.98, 1.14), vec3(0.90, 0.87, 0.15));
	col *= clamp(r * 1.54, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
