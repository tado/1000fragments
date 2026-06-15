uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.04 + t * 3.37 + ph) + sin(p.y * 4.10 - t * 2.39 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.05;
	p = abs(p) - 0.58;
	p = rot2(length(p) * 2.00 + time * 0.69) * p;
	{ p = vec2(atan(p.y, p.x) * 2.82, length(p) * 3.79 - time * 0.69); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.96 + time * 0.04);
	col = clamp((col - 0.5) * 1.38 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
