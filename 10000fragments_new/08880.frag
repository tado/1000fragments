uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 6.27 + t * 1.39 + ph) * 0.7;
    float wb = sin(p.y * 6.57 - t * 1.11 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.47;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.46), cos(time * 0.95)) * 0.07;
	float an = atan(p.y, p.x) + time * -0.35;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.22 / 3.1415927, 1.42 / r + time * 2.77);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.80 + time * 0.19, vec3(0.44, 0.51, 0.49), vec3(0.39, 0.49, 0.35), vec3(1.06, 1.05, 0.74), vec3(0.64, 0.14, 0.29));
	col *= clamp(r * 2.15, 0.0, 1.0);
	col = mod(col * 1.28, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
