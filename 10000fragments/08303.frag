uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.79 + sr * 12.52 - t * 4.69 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.98;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.19, lr * 2.52 + time * 0.60); }
	p *= 1.69;
	p += vec2(0.50, 0.48) * sin(length(p) * 5.76 - time * 0.98) * 0.24;
	p = fract(p * 1.27) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.90 + time * 0.09, vec3(0.41, 0.59, 0.58), vec3(0.46, 0.35, 0.35), vec3(1.18, 0.71, 1.28), vec3(0.35, 0.75, 0.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
