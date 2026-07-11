uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.30 + sr * 7.24 - t * 2.41 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.80), cos(time * 0.61)) * 0.17;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.13 / 3.1415927, 1.26 / r - time * 0.57);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.39 + time * 0.07, vec3(0.41, 0.56, 0.40), vec3(0.37, 0.50, 0.46), vec3(1.13, 1.09, 1.37), vec3(0.96, 0.62, 0.95));
	col *= clamp(r * 1.38, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
