uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.73 + sin(p.y * 2.88 + t * 1.08) * 1.66 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.57;
	{ float fr = length(p); p *= 1.0 + -0.73 * fr * fr; }
	p *= 1.27;
	p = rot2(length(p) * 1.77 + time * 0.53) * p;
	p = fract(p * 2.57) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.81 + time * 0.04);
	col = clamp((col - 0.5) * 2.10 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
