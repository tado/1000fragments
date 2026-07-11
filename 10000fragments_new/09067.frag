uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.07 + t * 4.67 + ph) + sin(p.y * 4.35 - t * 2.96 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.45), cos(time * 1.36)) * 0.17;
	float an = atan(p.y, p.x) + time * -0.43;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.80 / 3.1415927, 0.76 / r + time * 1.27);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.79 + time * 0.00, vec3(0.49, 0.51, 0.44), vec3(0.45, 0.33, 0.45), vec3(0.96, 0.78, 1.18), vec3(0.22, 0.48, 0.36));
	col *= clamp(r * 1.63, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
