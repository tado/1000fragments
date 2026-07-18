uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.20 + t * 2.68 + ph) + sin(p.y * 11.75 - t * 3.19 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.42 / 3.1415927, 0.87 / r - (time * 0.70) * 2.73);
	tv.x += tv.y * 0.49;
	float d = field(tv, (time * 0.70), 0.0);
	vec3 col = palette((d) * 0.62 + (time * 0.70) * 0.16, vec3(0.58, 0.46, 0.38), vec3(0.28, 0.23, 0.22), vec3(1.03, 1.02, 0.98), vec3(0.04, 0.08, 0.25));
	col *= clamp(r * 1.58, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.85));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.55);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col *= vec3(1.007, 0.974, 1.024);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
