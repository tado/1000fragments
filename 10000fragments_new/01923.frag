uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.12 + t * 1.27 + ph) + sin(p.y * 2.77 - t * 1.27 + ph)
        + sin((p.x + p.y) * 4.80 + t * 1.27 + ph) + sin(length(p) * 17.29 - t * 1.27 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.15 / 3.1415927, 1.19 / r + time * 2.24);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.10 + time * 0.10, vec3(0.53, 0.46, 0.59), vec3(0.41, 0.32, 0.48), vec3(0.82, 1.26, 0.99), vec3(0.75, 0.88, 0.25));
	col *= clamp(r * 1.65, 0.0, 1.0);
	col *= 0.89 + 0.11 * sin(gl_FragCoord.y * 0.92 + time * 6.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
