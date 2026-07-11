uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.68 + 0.23 * cos(sa * 5.0 + t * 1.91 + ph);
    v = sin((sr - petal) * 8.24);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.04;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.72; }
	p += vec2(-0.29, 0.30) * sin(length(p) * 4.83 - (time * 0.51) * 1.25) * 0.20;
	p *= 1.0 + 0.11 * sin((time * 0.51) * 1.47);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.54, lr * 2.11 + (time * 0.51) * 0.37); }
	float d = 0.5 + 0.5 * field(p, (time * 0.51), 0.0);
	vec3 col = mix(vec3(0.16, 0.16, 0.06), vec3(0.71, 0.73, 0.78), d);
	col = clamp((col - 0.5) * 1.32 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(0.998, 0.950, 1.022) * 1.00 + 0.049;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
