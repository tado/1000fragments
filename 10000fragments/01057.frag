uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.81 + t * 1.80 + ph) + sin(p.y * 11.08 - t * 1.80 + ph)
        + sin((p.x + p.y) * 3.93 + t * 1.80 + ph) + sin(length(p) * 12.52 - t * 1.80 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * 2.92 + time * 0.85) * p;
	p = rot2(p.y * 3.44 + time * 0.98) * p;
	p = rot2(time * 0.25) * p;
	p = abs(p) - 0.60;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.09 + time * 0.07, vec3(0.59, 0.53, 0.56), vec3(0.41, 0.39, 0.44), vec3(0.98, 1.10, 0.92), vec3(0.34, 0.72, 0.67));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.79));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
