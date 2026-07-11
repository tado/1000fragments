uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.41 + sr * 6.30 - t * 2.42 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.00), cos(time * 0.70)) * 0.21;
	float an = atan(p.y, p.x) + time * -0.74;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.20 / 3.1415927, 0.34 / r + time * 2.21);
	tv.x += tv.y * 0.31;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.11 + time * 0.33, vec3(0.42, 0.54, 0.54), vec3(0.34, 0.43, 0.43), vec3(0.88, 1.01, 1.00), vec3(0.64, 0.49, 0.61));
	col *= clamp(r * 2.97, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
