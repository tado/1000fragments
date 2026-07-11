uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 18.64 + t * 3.15 + ph) * 0.7;
    float wb = sin(p.y * 6.83 - t * 1.22 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.66;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.55;
	p = rot2(p.y * 1.67 + time * 0.49) * p;
	p = fract(p * 2.89) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.07 + time * 0.28);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.09 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
