uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.32, 0.0)) * 8.54 - t * 3.02 + ph);
    float mb = sin(length(p + vec2(0.32, 0.0)) * 21.81 - t * 3.02 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.96, lr * 2.91 + time * -0.80); }
	p = rot2(length(p) * 3.72 + time * 0.45) * p;
	{ float fr = length(p); p *= 1.0 + 0.48 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.48, 0.45, 0.47), vec3(0.80, 0.76, 0.47), d);
	col = fract(col * 1.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
