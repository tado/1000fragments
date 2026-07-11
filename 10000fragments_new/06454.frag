uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 20.80 - t * 3.29 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.25;
	p = rot2(2.70) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.43, lr * 2.73 + time * -0.33); }
	p.x += sin(p.y * 4.10 + time * 3.86) * 0.27;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.57 + time * 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
