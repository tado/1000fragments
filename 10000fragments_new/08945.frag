uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 8.07 + t * 1.64 + ph) * 0.7;
    float wb = sin(p.y * 5.57 - t * 3.63 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.48;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 1.04) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.87 + time * 0.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
