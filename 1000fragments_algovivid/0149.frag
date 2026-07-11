uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.49 + 0.15 * cos(sa * 7.0 + t * 1.43 + ph);
    v = sin((sr - petal) * 19.68);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.70) * 0.31), cos((time * 0.70) * 0.69)) * 0.22;
	p.x = abs(p.x);
	p *= 2.71;
	{ p = vec2(atan(p.y, p.x) * 2.16, length(p) * 4.54 - (time * 0.70) * 0.41); }
	p *= 2.55;
	p.y += sin(p.x * 6.62 + (time * 0.70) * 1.77) * 0.27;
	float d = field(p, (time * 0.70), 0.0);
	vec3 col = vec3(0.35, 0.52, 0.41) * (0.11 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col = clamp(col, 0.0, 1.0) * vec3(0.913, 0.991, 1.031) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
