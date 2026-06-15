uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.17 + sr * 4.86 - t * 1.97 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.32;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.45, lr * 1.58 + time * 0.77); }
	p = abs(p);
	p = fract(p * 1.48) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.69 + time * 0.00, vec3(0.42, 0.41, 0.43), vec3(0.44, 0.34, 0.39), vec3(0.95, 1.04, 1.03), vec3(0.12, 0.07, 0.84));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
