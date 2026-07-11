uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.88 + sin(p.y * 3.41 + t * 2.58) * 2.80 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.30;
	p = rot2(1.88) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.59 + time * 0.18, vec3(0.57, 0.52, 0.60), vec3(0.39, 0.32, 0.46), vec3(0.90, 1.14, 0.99), vec3(0.56, 0.51, 0.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
