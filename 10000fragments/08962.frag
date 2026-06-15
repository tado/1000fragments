uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.73 + t * 2.44 + ph) + sin(p.y * 15.89 - t * 1.62 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.81 + t * 3.37 + ph) + sin(p.y * 13.09 - t * 4.33 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.42;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.18, lr * 1.58 + time * -0.36); }
	p = rot2(length(p) * -2.74 + time * 0.75) * p;
	p = rot2(time * 0.59) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.45);
	float d = d1 + d2;
	vec3 col = palette(d * 0.53 + time * 0.30, vec3(0.51, 0.51, 0.49), vec3(0.41, 0.40, 0.43), vec3(1.33, 1.31, 1.38), vec3(0.93, 0.26, 0.40));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
