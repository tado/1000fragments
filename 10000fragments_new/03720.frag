uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 6.0 + qr * 4.90 * sin(t * 0.83) + t * 5.39 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.90), cos(time * 1.30)) * 0.21;
	float an = atan(p.y, p.x) + time * 0.30;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.98 / 3.1415927, 0.53 / r - time * 2.43);
	tv.x += tv.y * 0.48;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.97 + time * 0.39, vec3(0.46, 0.43, 0.51), vec3(0.49, 0.38, 0.49), vec3(1.28, 0.81, 0.81), vec3(0.03, 0.33, 0.93));
	col *= clamp(r * 2.53, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.78 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
