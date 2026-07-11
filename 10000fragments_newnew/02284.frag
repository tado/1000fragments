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
    float arm = sin(log(gr) * 3.22 + ga * 4.0 - t * 2.18 + ph);
    v = arm * exp(-gr * 1.10);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.81;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.86) * p * 22.76;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.50;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = palette(d * 0.73 + time * 0.02, vec3(0.59, 0.54, 0.53), vec3(0.46, 0.44, 0.34), vec3(1.23, 0.99, 1.11), vec3(0.55, 0.32, 0.73)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
