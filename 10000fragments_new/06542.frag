uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.99 + sr * 8.45 - t * 1.07 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.91 / 3.1415927, 1.05 / r - time * 1.34);
	tv.x += tv.y * 0.30;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.53 + time * 0.33, vec3(0.58, 0.40, 0.59), vec3(0.49, 0.44, 0.31), vec3(1.37, 1.33, 1.00), vec3(0.38, 0.16, 1.00));
	col *= clamp(r * 1.92, 0.0, 1.0);
	col *= 0.82 + 0.10 * sin(gl_FragCoord.y * 2.71 + time * 5.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
