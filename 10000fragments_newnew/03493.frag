uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.92 + sin(p.y * 3.26 + t * 5.57) * 1.93 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.48;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.64 / 3.1415927, 0.64 / r - time * 0.59);
	tv.x += tv.y * 0.18;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.04 + time * 0.22, vec3(0.40, 0.45, 0.57), vec3(0.43, 0.42, 0.37), vec3(0.95, 1.09, 0.72), vec3(0.92, 0.49, 0.65));
	col *= clamp(r * 1.31, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
