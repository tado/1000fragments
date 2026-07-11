uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.82 + sr * 19.91 - t * 0.87 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.59;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.48 / 3.1415927, 0.45 / r - time * 2.48);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.92 + time * 0.05, vec3(0.53, 0.46, 0.47), vec3(0.42, 0.49, 0.33), vec3(0.92, 1.16, 1.03), vec3(0.98, 0.85, 0.49));
	col *= clamp(r * 1.83, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
