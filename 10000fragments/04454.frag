uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.51, 0.0)) * 16.48 - t * 7.66 + ph);
    float mb = sin(length(p + vec2(0.51, 0.0)) * 29.51 - t * 7.66 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.83;
	p += vec2(0.09, -0.58) * sin(length(p) * 4.38 - time * 1.24) * 0.12;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.23, lr * 1.83 + time * 0.57); }
	{ p = vec2(atan(p.y, p.x) * 2.07, length(p) * 5.47 - time * 0.68); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.63 + time * 0.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
