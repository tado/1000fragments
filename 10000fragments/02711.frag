uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.35 + t * 0.32) - 0.5) * 2.0;
    v = sin((p.y * 7.54 + zx * 1.88 + t * 1.83) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.44), cos(time * 0.48)) * 0.25;
	float an = atan(p.y, p.x) + time * -0.64;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.12 / 3.1415927, 0.33 / r + time * 1.25);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.03 + time * 0.31, vec3(0.50, 0.57, 0.52), vec3(0.35, 0.37, 0.47), vec3(1.21, 1.19, 1.04), vec3(0.29, 0.38, 0.23));
	col *= clamp(r * 2.44, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
