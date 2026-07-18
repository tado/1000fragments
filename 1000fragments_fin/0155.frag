uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.64 + 0.27 * cos(sa * 7.0 + t * 1.87 + ph);
    v = sin((sr - petal) * 12.93);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.30 + t * 3.17 + ph) + sin(p.y * 9.35 - t * 3.17 + ph)
        + sin((p.x + p.y) * 2.51 + t * 3.17 + ph) + sin(length(p) * 13.36 - t * 3.17 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.84) * 0.88), cos((time * 0.84) * 1.01)) * 0.05;
	p = sin(p * 2.55 + (time * 0.84) * 1.73) * 0.74;
	float d1 = field(p, (time * 0.84), 0.0);
	float d2 = field2(p, (time * 0.84), 1.50);
	float d = mix(d1, d2, 0.5 + 0.5 * sin((time * 0.84) * 0.7));
	vec3 col = palette(d * 1.18 + (time * 0.84) * 0.03, vec3(0.31, 0.26, 0.40), vec3(0.45, 0.37, 0.50), vec3(0.96, 1.03, 0.97), vec3(0.57, 0.82, 0.13));
	col = clamp((col - 0.5) * 2.10 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(0.995, 1.005, 1.007);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.44 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
