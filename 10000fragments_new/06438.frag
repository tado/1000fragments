uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.78 + sin(p.y * 5.87 + t * 3.42) * 4.95 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.40), cos(time * 0.98)) * 0.13;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.15 / 3.1415927, 1.27 / r + time * 0.54);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.19 + time * 0.05, vec3(0.45, 0.53, 0.47), vec3(0.47, 0.37, 0.37), vec3(1.34, 0.93, 1.08), vec3(0.35, 0.46, 0.01));
	col *= clamp(r * 2.14, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
