uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.65 + t * 2.00 + ph) + sin(p.y * 3.41 - t * 2.00 + ph)
        + sin((p.x + p.y) * 9.27 + t * 2.00 + ph) + sin(length(p) * 13.33 - t * 2.00 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.99;
	p = rot2(1.95) * p;
	p *= 1.42;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.23, 1.10, 0.82) + vec3(0.10, 0.24, 0.03);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
