uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.74 + sin(p.y * 2.97 + t * 2.13) * 1.05 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.32 + sin(p.y * 3.02 + t * 2.60) * 3.76 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.69;
	p = abs(p);
	p += vec2(-0.87, -1.00) * sin(length(p) * 2.80 - time * 2.29) * 0.33;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.42; p = rot2(1.48) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.07, lr * 2.65 + time * -0.68); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.37);
	float d = d1 + d2;
	vec3 col = palette(d * 0.98 + time * 0.00, vec3(0.57, 0.50, 0.53), vec3(0.35, 0.36, 0.33), vec3(0.93, 0.97, 0.78), vec3(0.60, 0.92, 0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
