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
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 3.0 + qr * 2.81 * sin(t * 0.52) + t * 5.37 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.99;
	float d = 0.5 + 0.5 * field(p, (time * 0.67), 0.0);
	vec2 hq = rot2(0.71) * p * 23.81;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.57;
	float v = smoothstep(rad, rad - 0.19, length(hf));
	vec3 col = palette(d * 1.46 + (time * 0.67) * 0.10, vec3(0.44, 0.42, 0.38), vec3(0.33, 0.31, 0.25), vec3(1.03, 1.00, 0.66), vec3(0.02, 0.27, 0.40)) * v;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.72));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.43);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(1.000, 0.975, 1.023);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.25 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
