uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.57, 0.0)) * 31.82 - t * 6.77 + ph);
    float mb = sin(length(p + vec2(0.57, 0.0)) * 10.30 - t * 6.77 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 20.63 + sin(p.y * 3.01 + t * 5.65) * 3.69 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.41;
	p = rot2(time * -0.96) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.31);
	float d = d1 * d2;
	vec3 col = palette(d * 1.11 + time * 0.17, vec3(0.47, 0.42, 0.52), vec3(0.44, 0.30, 0.45), vec3(1.25, 0.80, 1.13), vec3(0.84, 0.99, 0.72));
	col = fract(col * 2.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
