uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.41 + 0.23 * cos(sa * 8.0 + t * 1.22 + ph);
    v = sin((sr - petal) * 7.66);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.74 / 3.1415927, 0.69 / r + time * 2.97);
	tv.x += tv.y * 0.11;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.47 + time * 0.04, vec3(0.48, 0.46, 0.58), vec3(0.42, 0.43, 0.44), vec3(0.99, 1.36, 0.87), vec3(0.54, 0.41, 0.30));
	col *= clamp(r * 2.77, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
