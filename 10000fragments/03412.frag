uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.18 + t * 4.35 + ph) + sin(p.y * 4.38 - t * 4.35 + ph)
        + sin((p.x + p.y) * 9.40 + t * 4.35 + ph) + sin(length(p) * 8.54 - t * 4.35 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * -1.69 + time * 0.79) * p;
	p = rot2(length(p) * 2.51 + time * 1.03) * p;
	p = abs(p) - 0.44;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.16 + time * 0.29);
	col = fract(col * 1.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
