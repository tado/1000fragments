uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.49 + 0.15 * pow(abs(cos(ra * 6.0 + t * 2.00)), 1.02);
    v = sin((rr - pet) * 13.00 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.48;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.07 / 3.1415927, 1.01 / r + time * 1.62);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.03 + time * 0.14, vec3(0.59, 0.46, 0.41), vec3(0.32, 0.47, 0.34), vec3(0.84, 1.01, 0.94), vec3(0.79, 0.96, 0.37));
	col *= clamp(r * 1.55, 0.0, 1.0);
	col = fract(col * 1.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
