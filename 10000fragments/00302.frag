uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.95 + t * 5.52 + ph) + sin(p.y * 5.54 - t * 3.80 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * -1.56 + time * 0.72) * p;
	p = fract(p * 1.82) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.52 + time * 0.25, vec3(0.46, 0.54, 0.54), vec3(0.44, 0.31, 0.46), vec3(0.93, 1.28, 0.90), vec3(0.24, 0.99, 0.59));
	col = mod(col * 2.40, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
