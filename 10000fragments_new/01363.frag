uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.01 + t * 4.38 + ph) + sin(p.y * 2.13 - t * 4.38 + ph)
        + sin((p.x + p.y) * 2.80 + t * 4.38 + ph) + sin(length(p) * 8.46 - t * 4.38 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.67 / 3.1415927, 0.65 / r + time * 1.62);
	tv.x += tv.y * 0.36;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.49 + time * 0.24, vec3(0.41, 0.48, 0.49), vec3(0.38, 0.36, 0.47), vec3(1.15, 0.82, 1.33), vec3(0.27, 0.08, 0.09));
	col *= clamp(r * 1.98, 0.0, 1.0);
	col = fract(col * 2.40);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
