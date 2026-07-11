uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.78 + sr * 18.00 - t * 1.71 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.71), cos(time * 1.07)) * 0.17;
	float an = atan(p.y, p.x) + time * 0.73;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.85 / 3.1415927, 1.13 / r + time * 1.78);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.76 + time * 0.36, vec3(0.49, 0.58, 0.49), vec3(0.43, 0.42, 0.44), vec3(1.15, 1.25, 1.27), vec3(0.69, 0.07, 0.82));
	col *= clamp(r * 1.65, 0.0, 1.0);
	col *= 0.87 + 0.13 * sin(gl_FragCoord.y * 2.94 + time * 4.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
