uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.37, 0.0)) * 20.51 - t * 3.34 + ph);
    float mb = sin(length(p + vec2(0.37, 0.0)) * 32.58 - t * 3.34 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.70 + t * 1.47 + ph) + sin(p.y * 4.34 - t * 1.47 + ph)
        + sin((p.x + p.y) * 11.35 + t * 1.47 + ph) + sin(length(p) * 11.67 - t * 1.47 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(2.97) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.55);
	float d = d1 * d2;
	vec3 col = palette(d * 0.88 + time * 0.15, vec3(0.55, 0.59, 0.43), vec3(0.36, 0.43, 0.42), vec3(1.08, 1.03, 1.13), vec3(0.65, 0.17, 0.27));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
