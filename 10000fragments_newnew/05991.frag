uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 16.30 + t * 3.21 + ph) * 0.7;
    float wb = sin(p.y * 7.95 - t * 3.09 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.46;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 2.66) - 0.5;
	p = rot2(time * -0.39) * p;
	{ float fr = length(p); p *= 1.0 + 0.43 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.86, 0.94, 0.16) * (0.11 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col = fract(col * 1.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
