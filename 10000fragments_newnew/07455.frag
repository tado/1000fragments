uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.26 + t * 0.86 + ph) + sin(p.y * 10.50 - t * 0.86 + ph)
        + sin((p.x + p.y) * 4.99 + t * 0.86 + ph) + sin(length(p) * 8.44 - t * 0.86 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.63), cos(time * 1.17)) * 0.13;
	float an = atan(p.y, p.x) + time * 0.15;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.83 / 3.1415927, 1.41 / r + time * 2.27);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.84 + time * 0.30, vec3(0.44, 0.57, 0.46), vec3(0.31, 0.38, 0.32), vec3(1.27, 1.36, 1.40), vec3(0.39, 0.20, 0.02));
	col *= clamp(r * 1.61, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.33 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
