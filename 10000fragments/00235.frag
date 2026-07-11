uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.47 + t * 1.93 + ph) + sin(p.y * 3.75 - t * 4.54 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.48;
	p *= 1.43;
	p = rot2(length(p) * -1.58 + time * 0.88) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.92 + time * 0.14, vec3(0.55, 0.56, 0.42), vec3(0.42, 0.50, 0.43), vec3(0.88, 0.74, 1.02), vec3(0.00, 0.19, 0.82));
	col = clamp((col - 0.5) * 1.52 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
