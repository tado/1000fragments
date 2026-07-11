uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.57 + 0.16 * cos(sa * 8.0 + t * 1.99 + ph);
    v = sin((sr - petal) * 12.96);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.66;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.11 / 3.1415927, 0.45 / r - time * 1.46);
	tv.x += tv.y * 0.46;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.45 + time * 0.29, vec3(0.41, 0.42, 0.60), vec3(0.38, 0.42, 0.43), vec3(1.22, 1.29, 0.91), vec3(0.60, 0.32, 0.25));
	col *= clamp(r * 1.77, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
