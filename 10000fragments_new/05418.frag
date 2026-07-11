uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 9.76 + t * 3.27 + ph) * 0.7;
    float wb = sin(p.y * 5.58 - t * 1.17 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.25;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.56;
	p = rot2(2.83) * p;
	p = rot2(time * 0.80) * p;
	{ p = vec2(atan(p.y, p.x) * 1.68, length(p) * 3.06 - time * 0.98); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.02, 0.66, 1.33) + vec3(0.11, 0.21, 0.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
