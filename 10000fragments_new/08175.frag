uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 4.89 + t * 2.66 + ph) * 0.7;
    float wb = sin(p.y * 4.32 - t * 1.89 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.70;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.27;
	p = rot2(time * -1.57) * p;
	p = fract(p * 1.64) - 0.5;
	p *= 1.77;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.78 + time * 0.07, vec3(0.45, 0.49, 0.43), vec3(0.32, 0.33, 0.35), vec3(0.91, 1.29, 1.36), vec3(0.45, 0.77, 0.81));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
