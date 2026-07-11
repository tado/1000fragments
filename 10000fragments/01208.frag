uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.89 + t * 0.69 + ph) + sin(p.y * 10.01 - t * 0.69 + ph)
        + sin((p.x + p.y) * 9.05 + t * 0.69 + ph) + sin(length(p) * 13.62 - t * 0.69 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.87;
	p = rot2(time * 1.36) * p;
	p = rot2(length(p) * -2.96 + time * 0.80) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.59 + time * 0.08, vec3(0.50, 0.42, 0.50), vec3(0.43, 0.31, 0.43), vec3(0.84, 1.18, 0.91), vec3(0.37, 0.46, 0.56));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
