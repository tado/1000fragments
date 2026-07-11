uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.92 + t * 2.33 + ph) * 0.7;
    float wb = sin(p.y * 8.28 - t * 0.63 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.64;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.94 / 3.1415927, 1.27 / r + time * 1.16);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.09 + time * 0.19, vec3(0.46, 0.40, 0.59), vec3(0.38, 0.42, 0.43), vec3(1.14, 0.75, 1.11), vec3(0.98, 0.56, 0.35));
	col *= clamp(r * 1.86, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
