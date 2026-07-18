uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.30;
	p = rot2((time * 0.84) * -0.64) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 0.61 + 0.55 * sin((time * 0.84) * 0.74);
	float n2 = 1.14 + 0.64 * cos((time * 0.84) * 1.77);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.44;
	float d = sr - rr;
	float v = sin(d * 19.27 - (time * 0.84) * 5.03);
	vec3 col = palette((v) * 1.16 + (time * 0.84) * 0.15, vec3(0.71, 0.63, 0.64), vec3(0.25, 0.22, 0.23), vec3(0.99, 1.03, 0.97), vec3(0.92, 0.03, 0.09));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.30);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(0.944, 0.991, 1.042);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.29 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
