uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.23 + sin(p.y * 4.55 + t * 5.05) * 1.23 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.47), cos(time * 1.40)) * 0.13;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.74 / 3.1415927, 1.19 / r - time * 0.66);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.48 + time * 0.14, vec3(0.40, 0.54, 0.60), vec3(0.49, 0.43, 0.33), vec3(0.90, 0.92, 0.81), vec3(0.70, 0.54, 0.00));
	col *= clamp(r * 2.99, 0.0, 1.0);
	col = fract(col * 1.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
