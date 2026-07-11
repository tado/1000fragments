uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 4.24 - t * 1.88;
    v = sin(floor(lv * 2.1) / 2.1 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -0.99) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.80 + time * 0.28, vec3(0.46, 0.48, 0.48), vec3(0.45, 0.32, 0.41), vec3(0.96, 1.13, 1.21), vec3(0.75, 0.30, 0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
