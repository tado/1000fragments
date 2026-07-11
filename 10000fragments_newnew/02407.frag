uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.68 + sr * 14.58 - t * 1.72 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.31), cos(time * 0.66)) * 0.18;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.41 / 3.1415927, 0.95 / r + time * 2.61);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.76 + time * 0.06, vec3(0.44, 0.43, 0.45), vec3(0.33, 0.49, 0.50), vec3(0.92, 1.09, 1.14), vec3(0.06, 0.49, 0.71));
	col *= clamp(r * 2.36, 0.0, 1.0);
	col = fract(col * 1.81);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
