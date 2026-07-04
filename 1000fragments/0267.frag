uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 7.03 + ga * 4.0 - t * 2.48 + ph);
    v = arm * exp(-gr * 1.26);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.57;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.55) * p * 16.47;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.65;
	float v = smoothstep(rad, rad - 0.08, length(hf));
	vec3 col = mix(vec3(0.06, 0.05, 0.06), vec3(0.98, 0.91, 0.81), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
