uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.29 + t * 1.23 + ph) + sin(p.y * 5.49 - t * 1.23 + ph)
        + sin((p.x + p.y) * 11.78 + t * 1.23 + ph) + sin(length(p) * 8.16 - t * 1.23 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.97;
	p = rot2(2.50) * p;
	p *= 1.32;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.58, 0.21, 0.17) * (0.18 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col = fract(col * 1.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
