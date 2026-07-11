uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.89 + t * 1.13 + ph) + sin(p.y * 7.78 - t * 1.13 + ph)
        + sin((p.x + p.y) * 4.59 + t * 1.13 + ph) + sin(length(p) * 16.74 - t * 1.13 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * -3.86 + time * 1.03) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.12 + time * 0.14);
	col = fract(col * 1.67);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
