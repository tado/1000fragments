uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.57 + t * 0.91 + ph) + sin(p.y * 2.85 - t * 0.91 + ph)
        + sin((p.x + p.y) * 4.64 + t * 0.91 + ph) + sin(length(p) * 3.91 - t * 0.91 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -1.26) * p;
	p = rot2(p.y * -2.19 + time * 0.41) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.87, 0.80, 1.30) + vec3(0.00, 0.21, 0.14);
	col = fract(col * 2.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
