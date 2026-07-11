uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 30.66 - t * 8.79 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.13), cos(time * 0.74)) * 0.28;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.90 / 3.1415927, 0.90 / r + time * 1.98);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.49 + time * 0.37, vec3(0.47, 0.43, 0.51), vec3(0.34, 0.45, 0.44), vec3(0.81, 0.91, 1.36), vec3(0.94, 0.38, 0.95));
	col *= clamp(r * 2.83, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
