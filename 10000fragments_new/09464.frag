uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.58, t * 2.23 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.12), cos(time * 1.24)) * 0.24;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.13 / 3.1415927, 0.82 / r - time * 2.49);
	tv.x += tv.y * 0.33;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.23 + time * 0.38, vec3(0.52, 0.42, 0.59), vec3(0.46, 0.39, 0.40), vec3(1.06, 1.40, 1.40), vec3(0.78, 0.95, 0.48));
	col *= clamp(r * 2.07, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
