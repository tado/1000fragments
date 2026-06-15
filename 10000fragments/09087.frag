uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.89 + t * 4.54 + ph) + sin(p.y * 14.07 - t * 1.95 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.34;
	p = rot2(length(p) * 2.30 + time * 0.25) * p;
	{ p = vec2(atan(p.y, p.x) * 2.52, length(p) * 5.33 - time * 0.39); }
	p = abs(p) - 0.80;
	p = rot2(p.y * 3.91 + time * 0.73) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.62 + time * 0.13);
	col = fract(col * 1.47);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
