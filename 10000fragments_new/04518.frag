uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.28 + t * 0.59 + ph) * 0.7;
    float wb = sin(p.y * 5.53 - t * 0.51 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.68;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.12;
	{ float fr = length(p); p *= 1.0 + 0.62 * fr * fr; }
	p = rot2(p.y * -3.19 + time * 0.80) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.24), field(p, time, 0.47));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
