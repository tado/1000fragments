uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.43 + t * 2.53 + ph) + sin(p.y * 7.79 - t * 2.53 + ph)
        + sin((p.x + p.y) * 7.39 + t * 2.53 + ph) + sin(length(p) * 9.40 - t * 2.53 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p);
	p = rot2(p.y * -1.65 + time * 0.56) * p;
	p.x += sin(p.y * 5.34 + time * 1.65) * 0.15;
	p = fract(p * 1.05) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.08 + time * 0.16, vec3(0.55, 0.48, 0.51), vec3(0.50, 0.44, 0.34), vec3(0.85, 1.17, 1.22), vec3(0.75, 0.57, 0.08));
	col = clamp((col - 0.5) * 1.90 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
