uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.20 + t * 1.02 + ph) + sin(p.y * 10.17 - t * 1.02 + ph)
        + sin((p.x + p.y) * 10.63 + t * 1.02 + ph) + sin(length(p) * 15.21 - t * 1.02 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.67;
	p = rot2(2.89) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.43 + time * 0.24, vec3(0.48, 0.46, 0.43), vec3(0.40, 0.47, 0.31), vec3(1.11, 0.89, 1.08), vec3(0.49, 0.87, 0.84));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
