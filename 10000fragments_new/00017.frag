uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.41 + 0.19 * pow(abs(cos(ra * 6.0 + t * 0.86)), 2.26);
    v = sin((rr - pet) * 17.85 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.72;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.41 / 3.1415927, 1.04 / r + time * 0.91);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.12 + time * 0.09, vec3(0.48, 0.53, 0.40), vec3(0.38, 0.41, 0.31), vec3(0.90, 0.93, 0.86), vec3(0.47, 0.71, 0.85));
	col *= clamp(r * 1.45, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
