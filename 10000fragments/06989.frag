uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.39 + t * 1.40 + ph) + sin(p.y * 2.51 - t * 1.40 + ph)
        + sin((p.x + p.y) * 9.23 + t * 1.40 + ph) + sin(length(p) * 16.06 - t * 1.40 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.47), cos(time * 1.45)) * 0.27;
	float an = atan(p.y, p.x) + time * 0.36;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.21 / 3.1415927, 0.84 / r + time * 2.09);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.48 + time * 0.36, vec3(0.60, 0.50, 0.59), vec3(0.40, 0.45, 0.43), vec3(1.21, 0.70, 1.05), vec3(0.75, 0.68, 0.85));
	col *= clamp(r * 1.49, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.12));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
