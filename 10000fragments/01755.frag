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
    float arm = sin(log(gr) * 5.58 + ga * 3.0 - t * 2.18 + ph);
    v = arm * exp(-gr * 1.22);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.53;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.20) * p * 10.30;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.67;
	float v = smoothstep(rad, rad - 0.19, length(hf));
	vec3 col = palette(d * 1.20 + time * 0.12, vec3(0.52, 0.52, 0.45), vec3(0.32, 0.34, 0.36), vec3(0.91, 1.03, 0.76), vec3(0.86, 0.92, 0.95)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
