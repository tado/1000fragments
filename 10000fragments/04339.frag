uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.27, 0.0)) * 26.93 - t * 1.37 + ph);
    float mb = sin(length(p + vec2(0.27, 0.0)) * 37.60 - t * 1.37 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(2.11) * p;
	{ float fr = length(p); p *= 1.0 + 0.62 * fr * fr; }
	p = abs(p);
	{ p = vec2(atan(p.y, p.x) * 2.30, length(p) * 5.32 - time * 0.58); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.72), field(p, time, 1.45));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.15));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
