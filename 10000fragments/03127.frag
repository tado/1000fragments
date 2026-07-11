uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.26 + vec2(t * 2.62, -t * 2.62) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.94;
	{ p = vec2(atan(p.y, p.x) * 1.41, length(p) * 4.58 - time * 0.74); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 2.33) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.44, lr * 1.45 + time * -0.37); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.92, 0.70, 0.89) + vec3(0.21, 0.27, 0.01);
	col = mod(col * 1.53, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
