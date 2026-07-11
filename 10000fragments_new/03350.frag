uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.53 + sin(p.y * 5.01 + t * 2.70) * 1.65 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.43), cos(time * 0.80)) * 0.19;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.49 / 3.1415927, 1.08 / r - time * 2.78);
	tv.x += tv.y * 0.12;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.45 + time * 0.13, vec3(0.51, 0.54, 0.55), vec3(0.43, 0.48, 0.33), vec3(1.03, 0.76, 1.27), vec3(0.40, 0.16, 0.71));
	col *= clamp(r * 1.20, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.32 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
