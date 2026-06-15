uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.51 + t * 3.50 + ph) + sin(p.y * 7.58 - t * 1.75 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 15.10 - t * 5.54 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * 3.70 + time * 0.65) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.21);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.67 + time * 0.04, vec3(0.58, 0.49, 0.51), vec3(0.47, 0.33, 0.48), vec3(0.71, 0.83, 1.04), vec3(0.04, 0.61, 0.53));
	col = mod(col * 2.72, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
