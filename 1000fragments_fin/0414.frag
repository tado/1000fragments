uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.40 + 0.27 * cos(sa * 5.0 + t * 2.56 + ph);
    v = sin((sr - petal) * 6.92);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.90;
	float d = 0.5 + 0.5 * field(p, (time * 0.78), 0.0);
	vec2 hq = rot2(0.86) * p * 17.50;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.62;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = palette(d * 0.74 + (time * 0.78) * 0.24, vec3(0.52, 0.43, 0.34), vec3(0.47, 0.34, 0.30), vec3(1.02, 0.98, 0.97), vec3(-0.00, 0.14, 0.32)) * v;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(0.980, 1.002, 0.956);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.39 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
