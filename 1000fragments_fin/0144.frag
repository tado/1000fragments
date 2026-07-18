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
    v = sin(sa * 10.68 + sr * 21.16 - t * 3.30 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.01;
	{ float fr = length(p); p *= 1.0 + 0.45 * fr * fr; }
	p = rot2(length(p) * -3.59 + (time * 0.70) * 0.62) * p;
	p = fract(p * 2.48) - 0.5;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.58; }
	float d = field(p, (time * 0.70), 0.0);
	vec3 col = palette(d * 0.84 + (time * 0.70) * 0.22, vec3(0.52, 0.39, 0.38), vec3(0.43, 0.33, 0.32), vec3(1.00, 0.96, 1.03), vec3(0.03, 0.34, 0.54));
	col = clamp((col - 0.5) * 1.73 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(1.011, 0.994, 1.009);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.48 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
