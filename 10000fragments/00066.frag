uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.84 + t * 2.26 + ph) + sin(p.y * 17.64 - t * 1.79 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.77;
	p *= 3.19;
	p = rot2(length(p) * -2.31 + time * 0.39) * p;
	p = rot2(p.y * 2.96 + time * 0.99) * p;
	p = rot2(2.96) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.32 + time * 0.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
