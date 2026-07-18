uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.32 + t * 0.62) - 0.5) * 2.0;
    v = sin((p.y * 7.93 + zx * 1.26 + t * 2.23) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.35;
	p += vec2(sin((time * 0.61) * 1.41), cos((time * 0.61) * 1.15)) * 0.06;
	float an = atan(p.y, p.x) + (time * 0.61) * 0.57;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.91 / 3.1415927, 1.32 / r + (time * 0.61) * 0.75);
	float d = field(tv, (time * 0.61), 0.0);
	vec3 col = vec3(0.953, 0.794, 0.468) * (0.07 / (abs((d)) + 0.05));
	col = col / (1.0 + col);
	col *= clamp(r * 2.38, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.61 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.44);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(0.988, 0.999, 0.933);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.44 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
