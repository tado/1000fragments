uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.04 + t * 3.27 + ph) + sin(p.y * 9.04 - t * 3.27 + ph)
        + sin((p.x + p.y) * 4.09 + t * 3.27 + ph) + sin(length(p) * 17.42 - t * 3.27 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.43 / 3.1415927, 0.82 / r - time * 0.86);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.92 + time * 0.12, vec3(0.55, 0.43, 0.45), vec3(0.39, 0.41, 0.44), vec3(1.15, 1.14, 1.21), vec3(0.01, 0.82, 0.09));
	col *= clamp(r * 1.38, 0.0, 1.0);
	col = fract(col * 1.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
