uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 5.69 + t * 0.63 + ph) * 0.7;
    float wb = sin(p.y * 17.35 - t * 3.21 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.51;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.82;
	p = rot2(time * -0.86) * p;
	p = fract(p * 2.16) - 0.5;
	p = rot2(1.44) * p;
	p += vec2(-0.99, -0.89) * sin(length(p) * 5.75 - time * 1.36) * 0.30;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.71 + time * 0.13, vec3(0.40, 0.48, 0.58), vec3(0.47, 0.35, 0.39), vec3(1.11, 1.27, 1.01), vec3(0.48, 0.50, 0.12));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
