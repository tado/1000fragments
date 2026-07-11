uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.29 + t * 2.66 + ph) + sin(p.y * 13.12 - t * 2.66 + ph)
        + sin((p.x + p.y) * 2.46 + t * 2.66 + ph) + sin(length(p) * 8.80 - t * 2.66 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.14;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.09 / 3.1415927, 1.03 / r - time * 1.55);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.18 + time * 0.36, vec3(0.54, 0.53, 0.52), vec3(0.50, 0.43, 0.35), vec3(0.84, 1.12, 0.93), vec3(0.01, 0.80, 0.69));
	col *= clamp(r * 2.36, 0.0, 1.0);
	col *= 0.81 + 0.11 * sin(gl_FragCoord.y * 2.22 + time * 6.64);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
