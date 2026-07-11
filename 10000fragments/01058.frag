uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.93 + t * 4.24 + ph) + sin(p.y * 2.82 - t * 4.24 + ph)
        + sin((p.x + p.y) * 5.68 + t * 4.24 + ph) + sin(length(p) * 7.04 - t * 4.24 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.32;
	p = rot2(p.y * -2.51 + time * 0.89) * p;
	p = abs(p) - 0.31;
	p += vec2(-0.63, -0.69) * sin(length(p) * 3.26 - time * 1.57) * 0.16;
	{ p = vec2(atan(p.y, p.x) * 2.40, length(p) * 4.55 - time * 0.31); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.38 + time * 0.16, vec3(0.54, 0.47, 0.50), vec3(0.37, 0.42, 0.37), vec3(1.20, 1.24, 0.79), vec3(0.41, 0.08, 0.47));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
