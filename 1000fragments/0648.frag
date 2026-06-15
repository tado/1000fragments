uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.80 + sin(p.y * 4.63 + t * 3.80) * 1.05 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 0.60) * p;
	p += vec2(0.16, -0.43) * sin(length(p) * 2.94 - time * 0.61) * 0.11;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.60 + time * 0.20, vec3(0.57, 0.51, 0.43), vec3(0.47, 0.49, 0.42), vec3(0.71, 1.24, 1.12), vec3(0.38, 0.58, 0.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
