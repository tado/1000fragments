uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 8.24 + t * 1.24 + ph) * 0.7;
    float wb = sin(p.y * 5.77 - t * 1.57 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.78;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.90;
	p += vec2(0.54, -0.51) * sin(length(p) * 4.58 - time * 1.27) * 0.34;
	p = rot2(p.y * -1.05 + time * 0.82) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = (floor(p * 29.7) + 0.5) / 29.7;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.05), field(p, time, 2.10));
	col = 0.5 + 0.5 * col;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.04;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
