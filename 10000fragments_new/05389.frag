uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 6.13);
    float gsh = hash21(vec2(grow, floor(t * 9.47))) - 0.5;
    float gx = p.x + gsh * 1.09;
    v = sin(gx * 15.95 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.12));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.74;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.22, lr * 1.61 + time * -0.23); }
	p = rot2(time * 0.90) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.30, 0.34, 0.01), vec3(0.57, 0.59, 0.94), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
