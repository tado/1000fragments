uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p *= 0.72;
	p *= 0.82;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.20 + 0.53 * sin((time * 0.82) * 1.27);
	float n2 = 2.34 + 0.84 * cos((time * 0.82) * 1.18);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.50;
	float d = sr - rr;
	float v = sin(d * 16.04 - (time * 0.82) * 4.62);
	vec3 col = palette((v) * 0.80 + (time * 0.82) * 0.07, vec3(0.57, 0.47, 0.33), vec3(0.28, 0.22, 0.20), vec3(1.00, 0.98, 1.02), vec3(0.01, 0.12, 0.23));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.20);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(0.946, 0.973, 1.035);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.25 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
