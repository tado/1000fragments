uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.62 + 0.19 * cos(sa * 4.0 + t * 0.74 + ph);
    v = sin((sr - petal) * 19.43);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.97), cos(time * 1.46)) * 0.28;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.02 / 3.1415927, 0.44 / r - time * 2.21);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.34 + time * 0.25, vec3(0.40, 0.44, 0.58), vec3(0.35, 0.46, 0.32), vec3(1.10, 0.95, 1.32), vec3(0.16, 0.64, 0.97));
	col *= clamp(r * 1.76, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.42 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
