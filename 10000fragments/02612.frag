uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.83 + t * 3.22 + ph) + sin(p.y * 6.03 - t * 3.22 + ph)
        + sin((p.x + p.y) * 2.02 + t * 3.22 + ph) + sin(length(p) * 6.66 - t * 3.22 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * 2.70 + time * 0.57) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.47, 0.56, 0.60) + vec3(0.08, 0.26, 0.14);
	col = fract(col * 1.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
