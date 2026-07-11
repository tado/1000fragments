uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.17 + t * 4.90 + ph) + sin(p.y * 12.37 - t * 4.90 + ph)
        + sin((p.x + p.y) * 7.07 + t * 4.90 + ph) + sin(length(p) * 17.41 - t * 4.90 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.38, lr * 2.79 + time * -0.44); }
	p = rot2(0.52) * p;
	p = rot2(time * -0.84) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.60 + time * 0.29, vec3(0.51, 0.55, 0.56), vec3(0.46, 0.33, 0.45), vec3(0.91, 1.00, 1.26), vec3(0.56, 0.79, 0.30));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
