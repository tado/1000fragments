uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 7.44 - t * 6.39 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.75 + t * 0.70 + ph) + sin(p.y * 6.03 - t * 0.61 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * 2.00 + time * 0.94) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.52);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.29 + time * 0.01, vec3(0.46, 0.47, 0.54), vec3(0.41, 0.33, 0.34), vec3(1.24, 1.18, 0.91), vec3(0.05, 0.14, 0.24));
	col = mod(col * 2.05, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
