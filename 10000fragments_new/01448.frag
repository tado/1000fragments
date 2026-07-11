uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.89, t * 0.73 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.45, 0.0)) * 35.90 - t * 4.12 + ph);
    float mb = sin(length(p + vec2(0.45, 0.0)) * 9.07 - t * 1.32 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -0.46) * p;
	p = fract(p * 1.75) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.47);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.16 + time * 0.06, vec3(0.45, 0.57, 0.53), vec3(0.46, 0.38, 0.42), vec3(0.98, 1.18, 1.13), vec3(0.54, 0.50, 0.70));
	col = clamp((col - 0.5) * 1.94 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
