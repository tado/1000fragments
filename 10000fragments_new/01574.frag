uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.94 + sr * 7.34 - t * 4.60 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.62;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.95 / 3.1415927, 0.77 / r + time * 2.45);
	tv.x += tv.y * 0.36;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.73 + time * 0.18, vec3(0.45, 0.60, 0.45), vec3(0.32, 0.42, 0.32), vec3(1.05, 1.09, 1.17), vec3(0.45, 0.79, 0.19));
	col *= clamp(r * 1.26, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
