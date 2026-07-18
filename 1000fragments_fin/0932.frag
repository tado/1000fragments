uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.62 - t * 0.73;
    v = sin(floor(lv * 3.9) / 3.9 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.96;
	p = p.yx;
	float an = atan(p.y, p.x) + (time * 0.84) * 0.18;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.92 / 3.1415927, 0.33 / r - (time * 0.84) * 2.95);
	float d = field(tv, (time * 0.84), 0.0);
	vec3 col = palette((d) * 0.51 + (time * 0.84) * 0.01, vec3(0.61, 0.70, 0.78), vec3(0.26, 0.21, 0.20), vec3(1.03, 1.02, 1.01), vec3(0.51, 0.55, 0.68));
	col *= clamp(r * 2.93, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.38);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(1.006, 0.970, 1.021);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
