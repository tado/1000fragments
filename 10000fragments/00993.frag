uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.50 + t * 4.80 + ph) + sin(p.y * 4.37 - t * 4.80 + ph)
        + sin((p.x + p.y) * 4.59 + t * 4.80 + ph) + sin(length(p) * 8.95 - t * 4.80 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.87;
	p = rot2(0.79) * p;
	p = fract(p * 1.54) - 0.5;
	p = rot2(length(p) * -3.80 + time * 0.54) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.63 + time * 0.28);
	col = fract(col * 1.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
