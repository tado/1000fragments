uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.40 + 0.26 * pow(abs(cos(ra * 4.0 + t * 1.36)), 0.95);
    v = sin((rr - pet) * 15.85 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.63;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.77 / 3.1415927, 1.07 / r - time * 1.35);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.77 + time * 0.38, vec3(0.53, 0.44, 0.46), vec3(0.46, 0.36, 0.40), vec3(1.11, 1.39, 0.85), vec3(0.65, 0.83, 0.39));
	col *= clamp(r * 1.35, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
