uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.65 + 0.23 * cos(sa * 4.0 + t * 2.61 + ph);
    v = sin((sr - petal) * 14.95);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.11), cos(time * 1.09)) * 0.19;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.23 / 3.1415927, 1.42 / r - time * 2.56);
	tv.x += tv.y * 0.46;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.22 + time * 0.11, vec3(0.57, 0.60, 0.53), vec3(0.30, 0.32, 0.34), vec3(1.38, 1.05, 1.26), vec3(0.09, 0.80, 0.13));
	col *= clamp(r * 2.71, 0.0, 1.0);
	col *= 0.89 + 0.15 * sin(gl_FragCoord.y * 1.79 + time * 17.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
