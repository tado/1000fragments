uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.86 + t * 2.36 + ph) + sin(p.y * 8.45 - t * 2.36 + ph)
        + sin((p.x + p.y) * 6.01 + t * 2.36 + ph) + sin(length(p) * 4.53 - t * 2.36 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.36) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 2.18, length(p) * 3.05 - time * 0.26); }
	p = rot2(length(p) * -2.31 + time * 0.97) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.70 + time * 0.21);
	col = fract(col * 1.86);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
