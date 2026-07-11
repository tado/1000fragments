uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.75 + sin(p.y * 3.59 + t * 0.53) * 4.31 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.58 + t * 2.57 + ph) + sin(p.y * 14.96 - t * 4.13 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 1.56) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.70);
	float d = d1 * d2;
	vec3 col = palette(d * 1.08 + time * 0.11, vec3(0.56, 0.58, 0.52), vec3(0.48, 0.39, 0.35), vec3(0.78, 1.20, 1.07), vec3(0.22, 0.11, 0.41));
	col = mod(col * 2.16, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
