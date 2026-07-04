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
    float arm = sin(log(gr) * 5.21 + ga * 2.0 - t * 0.65 + ph);
    v = arm * exp(-gr * 1.32);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.56) * p * 13.49;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.51;
	float v = smoothstep(rad, rad - 0.20, length(hf));
	vec3 col = palette(d * 1.45 + time * 0.23, vec3(0.54, 0.55, 0.49), vec3(0.34, 0.36, 0.37), vec3(0.79, 1.23, 1.24), vec3(0.50, 0.11, 0.73)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
