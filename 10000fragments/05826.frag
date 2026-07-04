uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.88 + t * 5.98 + ph) + sin(p.y * 10.24 - t * 2.87 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.87), cos(time * 0.68)) * 0.07;
	float an = atan(p.y, p.x) + time * 0.56;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.68 / 3.1415927, 1.41 / r + time * 2.25);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.85 + time * 0.23, vec3(0.59, 0.46, 0.47), vec3(0.34, 0.50, 0.31), vec3(1.35, 0.81, 1.25), vec3(0.92, 0.60, 0.28));
	col *= clamp(r * 2.51, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
