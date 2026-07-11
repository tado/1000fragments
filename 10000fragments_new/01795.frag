uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 15.04 + t * 3.34 + ph) * 0.7;
    float wb = sin(p.y * 9.61 - t * 1.71 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.55;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.66;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.37 / 3.1415927, 0.69 / r + time * 1.66);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.11 + time * 0.04, vec3(0.42, 0.46, 0.55), vec3(0.34, 0.32, 0.47), vec3(0.74, 1.16, 0.87), vec3(0.10, 0.03, 0.64));
	col *= clamp(r * 1.64, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
