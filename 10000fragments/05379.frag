uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.87 + t * 1.94 + ph) + sin(p.y * 6.09 - t * 1.94 + ph)
        + sin((p.x + p.y) * 3.22 + t * 1.94 + ph) + sin(length(p) * 4.24 - t * 1.94 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.79;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.19 / 3.1415927, 0.43 / r + time * 1.61);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.61 + time * 0.28, vec3(0.47, 0.44, 0.47), vec3(0.46, 0.33, 0.34), vec3(1.23, 1.34, 1.30), vec3(0.41, 0.52, 0.61));
	col *= clamp(r * 1.28, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.79));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
