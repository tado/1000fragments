uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 15.90 + t * 3.11 + ph) * 0.7;
    float wb = sin(p.y * 6.58 - t * 2.18 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.54;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.13;
	p *= 2.53;
	p *= 1.0 + 0.40 * sin(time * 4.10);
	p = fract(p * 2.05) - 0.5;
	p = rot2(length(p) * -1.98 + time * 0.90) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.56 + time * 0.09, vec3(0.59, 0.55, 0.59), vec3(0.41, 0.48, 0.45), vec3(0.72, 1.08, 1.08), vec3(0.89, 0.72, 0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
