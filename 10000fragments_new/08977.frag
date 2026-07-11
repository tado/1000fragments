uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.27 + t * 3.17 + ph) + sin(p.y * 10.49 - t * 3.17 + ph)
        + sin((p.x + p.y) * 4.86 + t * 3.17 + ph) + sin(length(p) * 10.07 - t * 3.17 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.71 / 3.1415927, 0.91 / r - time * 1.85);
	tv.x += tv.y * 0.18;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.48 + time * 0.14, vec3(0.48, 0.59, 0.54), vec3(0.33, 0.39, 0.46), vec3(0.77, 1.02, 1.32), vec3(0.01, 0.08, 0.98));
	col *= clamp(r * 1.75, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
