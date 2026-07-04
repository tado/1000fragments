uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 5.68 + ga * 4.0 - t * 1.51 + ph);
    v = arm * exp(-gr * 0.59);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.17) * p * 13.09;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.70;
	float v = smoothstep(rad, rad - 0.10, length(hf));
	vec3 col = mix(vec3(0.76, 0.90, 0.86), vec3(0.07, 0.04, 0.07), v);
	col = mod(col * 2.87, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
