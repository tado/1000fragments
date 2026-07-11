uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 6.71 + t * 2.58 + ph) * 0.7;
    float wb = sin(p.y * 4.23 - t * 2.10 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.22;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.93;
	p = rot2(length(p) * 3.19 + time * 0.42) * p;
	p = rot2(p.y * 3.19 + time * 0.69) * p;
	p.y += sin(p.x * 4.38 + time * 2.23) * 0.27;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.09 + time * 0.13);
	col = fract(col * 1.59);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
