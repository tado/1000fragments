uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.24 + t * 5.52 + ph) + sin(p.y * 17.07 - t * 5.33 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.57, 0.0)) * 22.73 - t * 1.85 + ph);
    float mb = sin(length(p + vec2(0.57, 0.0)) * 8.70 - t * 1.85 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.88;
	p = rot2(length(p) * 2.86 + time * 0.67) * p;
	p = abs(p) - 0.39;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.23);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.23 + time * 0.28, vec3(0.46, 0.47, 0.60), vec3(0.33, 0.48, 0.43), vec3(1.14, 1.20, 0.81), vec3(0.73, 0.11, 0.01));
	col = fract(col * 2.39);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
