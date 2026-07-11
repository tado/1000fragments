uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.75 + t * 1.24 + ph) + sin(p.y * 5.83 - t * 1.24 + ph)
        + sin((p.x + p.y) * 2.82 + t * 1.24 + ph) + sin(length(p) * 16.45 - t * 1.24 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.19), cos(time * 1.43)) * 0.28;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.61 / 3.1415927, 1.34 / r + time * 0.58);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.97 + time * 0.22, vec3(0.55, 0.44, 0.60), vec3(0.32, 0.36, 0.44), vec3(0.96, 1.37, 0.96), vec3(0.48, 0.53, 0.11));
	col *= clamp(r * 1.26, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
