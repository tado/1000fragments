uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.04 + sr * 12.78 - t * 0.57 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.49, 0.0)) * 29.94 - t * 5.22 + ph);
    float mb = sin(length(p + vec2(0.49, 0.0)) * 33.44 - t * 5.22 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.90;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.38, lr * 1.77 + time * -0.70); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.56);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.23 + time * 0.07, vec3(0.50, 0.51, 0.58), vec3(0.43, 0.46, 0.39), vec3(1.07, 0.78, 0.83), vec3(0.55, 0.95, 0.16));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
