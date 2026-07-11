uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 32.10 - t * 3.32 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.50 * fr * fr; }
	p = rot2(1.41) * p;
	p = rot2(p.y * -3.38 + time * 0.41) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.31 + time * 0.14);
	col = clamp((col - 0.5) * 2.03 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
