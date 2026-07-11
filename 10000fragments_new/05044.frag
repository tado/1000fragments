uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 14.00 + t * 1.12 + ph) * 0.7;
    float wb = sin(p.y * 6.92 - t * 1.37 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.58;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.24;
	{ float fr = length(p); p *= 1.0 + 0.53 * fr * fr; }
	p = (floor(p * 12.7) + 0.5) / 12.7;
	p = rot2(length(p) * 1.65 + time * 0.78) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.35), field(p, time, 0.70));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
