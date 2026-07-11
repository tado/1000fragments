uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.77 + t * 3.07 + ph) + sin(p.y * 10.29 - t * 3.07 + ph)
        + sin((p.x + p.y) * 2.72 + t * 3.07 + ph) + sin(length(p) * 13.51 - t * 3.07 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * -2.50 + time * 1.04) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.51 + time * 0.20, vec3(0.59, 0.54, 0.41), vec3(0.36, 0.31, 0.49), vec3(1.18, 0.72, 1.04), vec3(0.32, 0.59, 0.77));
	col = mod(col * 1.85, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
