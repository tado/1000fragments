uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.58 + t * 0.77 + ph) + sin(p.y * 3.01 - t * 0.77 + ph)
        + sin((p.x + p.y) * 7.13 + t * 0.77 + ph) + sin(length(p) * 4.46 - t * 0.77 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.49;
	p = rot2(1.21) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.63 + time * 0.17, vec3(0.56, 0.55, 0.43), vec3(0.48, 0.42, 0.39), vec3(1.17, 1.20, 0.79), vec3(0.78, 0.94, 0.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
