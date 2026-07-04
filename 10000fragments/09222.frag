uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 3.23 + ga * 2.0 - t * 2.54 + ph);
    v = arm * exp(-gr * 1.04);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.61;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.50) * p * 19.51;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.74;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = palette(d * 1.48 + time * 0.24, vec3(0.53, 0.53, 0.48), vec3(0.48, 0.43, 0.43), vec3(0.75, 0.83, 1.36), vec3(0.27, 0.35, 0.10)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
