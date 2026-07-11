uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.12, t * 2.31 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.22;
	p = abs(p) - 0.77;
	p = rot2(length(p) * 3.30 + time * 0.95) * p;
	{ p = vec2(atan(p.y, p.x) * 2.40, length(p) * 4.98 - time * 0.15); }
	{ float fr = length(p); p *= 1.0 + -0.64 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.90 + time * 0.01);
	col = fract(col * 2.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
