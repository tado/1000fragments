uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.26 + vec2(t * 2.28, -t * 2.28) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(2.48) * p;
	{ float fr = length(p); p *= 1.0 + -0.51 * fr * fr; }
	p = rot2(p.y * 3.34 + time * 0.33) * p;
	{ p = vec2(atan(p.y, p.x) * 1.29, length(p) * 2.44 - time * 0.29); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.11 + time * 0.27);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
