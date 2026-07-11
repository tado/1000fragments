uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.02 + vec2(t * 0.73, -t * 0.73) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * -3.53 + time * 0.21) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 2.64, length(p) * 4.51 - time * 0.27); }
	p = fract(p * 2.06) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.70 + time * 0.09, vec3(0.54, 0.43, 0.46), vec3(0.30, 0.42, 0.47), vec3(1.18, 1.27, 1.02), vec3(0.89, 0.88, 0.01));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
