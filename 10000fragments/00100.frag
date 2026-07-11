uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.20 + t * 1.86 + ph) + sin(p.y * 3.41 - t * 3.04 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p);
	p *= 3.13;
	p = rot2(p.y * -1.87 + time * 0.53) * p;
	p = rot2(length(p) * 3.87 + time * 0.50) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.98, 0.82, 0.67) + vec3(0.28, 0.07, 0.02);
	col = clamp((col - 0.5) * 1.49 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
