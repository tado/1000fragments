uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.75 + sr * 5.37 - t * 3.98 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.58;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.24 / 3.1415927, 0.71 / r + time * 1.91);
	tv.x += tv.y * 0.39;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.65 + time * 0.01, vec3(0.51, 0.55, 0.57), vec3(0.42, 0.45, 0.38), vec3(1.01, 0.90, 1.23), vec3(0.63, 0.46, 0.02));
	col *= clamp(r * 1.82, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
