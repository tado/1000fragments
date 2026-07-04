uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 9.72 + t * 2.86 + ph) * 0.7;
    float wb = sin(p.y * 10.33 - t * 1.39 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.48;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.64), cos(time * 1.11)) * 0.12;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.12 / 3.1415927, 1.00 / r - time * 1.65);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.59 + time * 0.03, vec3(0.50, 0.44, 0.52), vec3(0.46, 0.46, 0.50), vec3(1.07, 0.73, 1.29), vec3(0.72, 0.90, 0.60));
	col *= clamp(r * 1.12, 0.0, 1.0);
	col = clamp((col - 0.5) * 2.01 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
