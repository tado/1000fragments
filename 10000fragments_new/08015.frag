uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.39 + 0.16 * pow(abs(cos(ra * 2.0 + t * 1.17)), 2.56);
    v = sin((rr - pet) * 21.73 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.49;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.02 / 3.1415927, 0.64 / r - time * 0.86);
	tv.x += tv.y * 0.18;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.54 + time * 0.29, vec3(0.46, 0.47, 0.42), vec3(0.36, 0.32, 0.46), vec3(1.33, 0.98, 0.84), vec3(0.75, 0.75, 0.60));
	col *= clamp(r * 2.73, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.32 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
