uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.22, 0.0)) * 19.47 - t * 2.59 + ph);
    float mb = sin(length(p + vec2(0.22, 0.0)) * 17.64 - t * 2.59 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.44, lr * 1.67 + time * -0.52); }
	p = rot2(1.02) * p;
	p = rot2(length(p) * -3.90 + time * 0.45) * p;
	p = rot2(time * -0.73) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.34 + time * 0.06);
	col = fract(col * 1.50);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
