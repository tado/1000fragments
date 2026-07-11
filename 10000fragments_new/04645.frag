uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.32 + 0.26 * cos(sa * 6.0 + t * 2.50 + ph);
    v = sin((sr - petal) * 12.35);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.09), cos(time * 0.86)) * 0.26;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.50 / 3.1415927, 1.14 / r - time * 0.57);
	tv.x += tv.y * 0.15;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.78 + time * 0.34, vec3(0.60, 0.48, 0.45), vec3(0.34, 0.41, 0.31), vec3(0.89, 1.10, 1.16), vec3(0.31, 0.57, 0.52));
	col *= clamp(r * 2.76, 0.0, 1.0);
	col *= 0.86 + 0.14 * sin(gl_FragCoord.y * 0.98 + time * 9.79);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
