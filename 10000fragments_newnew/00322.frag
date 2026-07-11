uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.90, t * 0.86 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.91), cos(time * 0.84)) * 0.18;
	float an = atan(p.y, p.x) + time * -0.45;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.09 / 3.1415927, 0.39 / r - time * 1.77);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.08 + time * 0.32, vec3(0.52, 0.45, 0.41), vec3(0.46, 0.44, 0.32), vec3(1.15, 1.05, 1.34), vec3(0.25, 0.59, 0.28));
	col *= clamp(r * 1.57, 0.0, 1.0);
	col = clamp((col - 0.5) * 2.04 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
