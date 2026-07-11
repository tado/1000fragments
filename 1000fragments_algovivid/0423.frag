uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.42 + 0.15 * cos(sa * 7.0 + t * 2.35 + ph);
    v = sin((sr - petal) * 14.07);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x) - 0.38;
	p.x *= resolution.x / resolution.y;
	p *= 2.06;
	float d = 0.5 + 0.5 * field(p, (time * 0.67), 0.0);
	vec2 hq = rot2(0.49) * p * 8.42;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.68;
	float v = smoothstep(rad, rad - 0.12, length(hf));
	vec3 col = mix(vec3(0.84, 0.71, 0.75), vec3(0.14, 0.01, 0.02), v);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col = clamp(col, 0.0, 1.0) * vec3(1.034, 0.970, 0.939) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
