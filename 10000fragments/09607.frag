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
    float arm = sin(log(gr) * 7.67 + ga * 5.0 - t * 2.85 + ph);
    v = arm * exp(-gr * 1.15);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.85;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.86) * p * 17.19;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.69;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = palette(d * 0.88 + time * 0.02, vec3(0.42, 0.54, 0.43), vec3(0.37, 0.31, 0.36), vec3(1.33, 0.97, 1.38), vec3(0.75, 0.04, 0.80)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
