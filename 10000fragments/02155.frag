uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.15 + t * 4.88 + ph) + sin(p.y * 9.83 - t * 4.19 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.71 / 3.1415927, 0.55 / r - time * 2.93);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.56 + time * 0.35, vec3(0.43, 0.50, 0.52), vec3(0.30, 0.47, 0.48), vec3(1.29, 0.85, 0.85), vec3(0.27, 0.38, 0.88));
	col *= clamp(r * 2.79, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
