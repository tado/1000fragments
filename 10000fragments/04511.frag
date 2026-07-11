uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.27, 0.0)) * 36.73 - t * 1.60 + ph);
    float mb = sin(length(p + vec2(0.27, 0.0)) * 38.13 - t * 1.60 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.33) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.04, lr * 2.89 + time * 0.74); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.23 + time * 0.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
