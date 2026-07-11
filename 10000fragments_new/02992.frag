uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.32 + t * 1.46 + ph) + sin(p.y * 5.00 - t * 1.46 + ph)
        + sin((p.x + p.y) * 6.73 + t * 1.46 + ph) + sin(length(p) * 9.90 - t * 1.46 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.43;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.05 / 3.1415927, 0.72 / r - time * 2.65);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.67 + time * 0.03, vec3(0.51, 0.49, 0.51), vec3(0.33, 0.45, 0.48), vec3(0.88, 1.31, 0.97), vec3(0.11, 0.32, 0.81));
	col *= clamp(r * 1.14, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
