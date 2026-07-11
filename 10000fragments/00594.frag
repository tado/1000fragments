uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.32 + sin(p.y * 2.95 + t * 5.90) * 4.51 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + 0.21 * fr * fr; }
	p = rot2(p.y * -3.11 + time * 0.22) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.10 + time * 0.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
