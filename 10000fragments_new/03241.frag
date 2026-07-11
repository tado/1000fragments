uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.07, t * 2.15 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.14), cos(time * 0.77)) * 0.19;
	float an = atan(p.y, p.x) + time * -0.62;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.99 / 3.1415927, 1.38 / r + time * 2.53);
	tv.x += tv.y * 0.22;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.28 + time * 0.09, vec3(0.56, 0.44, 0.52), vec3(0.31, 0.35, 0.48), vec3(0.86, 0.80, 1.11), vec3(0.51, 0.99, 0.82));
	col *= clamp(r * 1.88, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
