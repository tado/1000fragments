uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.05 + t * 2.04 + ph) * 0.7;
    float wb = sin(p.y * 12.78 - t * 0.86 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.43;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = (floor(p * 22.6) + 0.5) / 22.6;
	p = rot2(length(p) * -3.60 + time * 1.38) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.50, lr * 1.61 + time * -0.31); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.95, 0.72, 0.97) * (0.08 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = mod(col * 2.53, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
