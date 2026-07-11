uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 4.90 + t * 2.07 + ph) * 0.7;
    float wb = sin(p.y * 18.35 - t * 1.39 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.58;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.38;
	p = rot2(2.66) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.76 + time * 0.09);
	col = mod(col * 1.36, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
