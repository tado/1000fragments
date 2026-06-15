uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.39 + t * 1.27 + ph) + sin(p.y * 4.79 - t * 1.27 + ph)
        + sin((p.x + p.y) * 5.78 + t * 1.27 + ph) + sin(length(p) * 14.00 - t * 1.27 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.32;
	p *= 3.17;
	p = rot2(0.47) * p;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.90, 1.22, 0.65) + vec3(0.03, 0.10, 0.28);
	col = clamp((col - 0.5) * 2.15 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
