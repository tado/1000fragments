uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p *= 1.46;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.61 + 0.23 * sin((time * 0.66) * 1.60);
	float n2 = 1.59 + 0.78 * cos((time * 0.66) * 0.80);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.68;
	float d = sr - rr;
	float v = d;
	vec3 col = palette((v) * 0.58 + (time * 0.66) * 0.07, vec3(0.49, 0.38, 0.48), vec3(0.35, 0.28, 0.36), vec3(0.95, 1.00, 1.01), vec3(0.79, 0.92, 0.12));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.54);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(1.010, 1.006, 1.003);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.38 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
