uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.62 + t * 0.71 + ph) + sin(p.y * 16.13 - t * 1.48 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.11), cos(time * 1.39)) * 0.18;
	float an = atan(p.y, p.x) + time * 0.58;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.28 / 3.1415927, 0.61 / r - time * 2.88);
	tv.x += tv.y * 0.37;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.89 + time * 0.28, vec3(0.53, 0.50, 0.47), vec3(0.35, 0.33, 0.37), vec3(1.27, 0.80, 0.75), vec3(0.38, 0.54, 0.07));
	col *= clamp(r * 1.40, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
