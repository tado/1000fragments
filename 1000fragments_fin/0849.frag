uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.17 + (time * 0.89) * 0.88) * 0.13;
	p *= 0.90;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 0.54 + 0.37 * sin((time * 0.89) * 1.79);
	float n2 = 1.16 + 0.45 * cos((time * 0.89) * 0.53);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.56;
	float d = sr - rr;
	float v = d;
	vec3 col = palette((v) * 1.05 + (time * 0.89) * 0.21, vec3(0.52, 0.44, 0.37), vec3(0.46, 0.35, 0.29), vec3(0.95, 0.95, 1.02), vec3(-0.02, 0.09, 0.28));
	col = clamp((col - 0.5) * 1.96 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col *= vec3(0.974, 1.006, 0.958);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.32 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
