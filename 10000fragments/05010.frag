uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.27 + sr * 23.68 - t * 4.42 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.05 + t * 3.96 + ph) + sin(p.y * 12.04 - t * 4.63 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.59;
	p *= 3.03;
	{ p = vec2(atan(p.y, p.x) * 1.09, length(p) * 3.84 - time * 0.15); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.21, lr * 2.01 + time * 0.79); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.01);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.71 + time * 0.28, vec3(0.50, 0.54, 0.50), vec3(0.34, 0.42, 0.34), vec3(1.25, 1.20, 0.70), vec3(0.14, 0.90, 0.51));
	col = mod(col * 1.63, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
