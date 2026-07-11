uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.33 + sr * 14.34 - t * 4.52 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.61 / 3.1415927, 0.59 / r - time * 1.60);
	tv.x += tv.y * 0.21;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.71 + time * 0.26, vec3(0.48, 0.59, 0.49), vec3(0.40, 0.46, 0.31), vec3(1.16, 0.89, 1.17), vec3(0.14, 0.28, 0.32));
	col *= clamp(r * 1.10, 0.0, 1.0);
	col = mod(col * 2.44, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
