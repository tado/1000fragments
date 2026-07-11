uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.48 + t * 2.70 + ph) + sin(p.y * 4.83 - t * 2.70 + ph)
        + sin((p.x + p.y) * 4.41 + t * 2.70 + ph) + sin(length(p) * 3.48 - t * 2.70 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.77;
	p = rot2(length(p) * -1.27 + time * 0.34) * p;
	p *= 2.12;
	p = rot2(1.56) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.69 + time * 0.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
