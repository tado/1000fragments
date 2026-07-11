uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.31 + t * 2.11 + ph) + sin(p.y * 8.29 - t * 2.11 + ph)
        + sin((p.x + p.y) * 10.47 + t * 2.11 + ph) + sin(length(p) * 16.70 - t * 2.11 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.29 * fr * fr; }
	p *= 1.36;
	p = rot2(1.18) * p;
	p = rot2(length(p) * 1.83 + time * 0.21) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.37 + time * 0.04, vec3(0.43, 0.57, 0.51), vec3(0.36, 0.47, 0.39), vec3(1.17, 1.20, 1.27), vec3(0.57, 0.09, 0.67));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
