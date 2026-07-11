uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.82, t * 0.95 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.60), cos(time * 0.41)) * 0.29;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.33 / 3.1415927, 1.29 / r + time * 1.89);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.09 + time * 0.11, vec3(0.48, 0.56, 0.54), vec3(0.45, 0.33, 0.50), vec3(0.75, 1.19, 1.19), vec3(0.86, 0.48, 0.13));
	col *= clamp(r * 2.08, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
